"""
migrar_cpap_candidates.py
Lee scratch/cpap_candidates.csv, trae datos completos de la BD de DMSO,
e inserta en la BD de CPAP con activo=False para revisión.

Uso:
    python scripts/migrar_cpap_candidates.py
    python scripts/migrar_cpap_candidates.py --dry-run   (solo muestra lo que haría)
"""

import csv
import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
import re
import unicodedata
import argparse
import psycopg2
import psycopg2.extras
from pathlib import Path

# ─── Conexiones ──────────────────────────────────────────────────────────────

DMSO_DB = {
    "host":     "ep-broad-leaf-aneazel2-pooler.c-6.us-east-1.aws.neon.tech",
    "dbname":   "neondb",
    "user":     "neondb_owner",
    "password": "npg_toOvKURuY4n2",
    "sslmode":  "require",
    "connect_timeout": 30,
}

CPAP_DB = {
    "host":     "ep-bold-rain-anev6sr2-pooler.c-6.us-east-1.aws.neon.tech",
    "dbname":   "neondb",
    "user":     "neondb_owner",
    "password": "npg_0L9QSrBDaYsI",
    "sslmode":  "require",
    "connect_timeout": 30,
}

CSV_PATH = Path(__file__).parent.parent / "scratch" / "cpap_candidates.csv"

# ─── Utilidades ──────────────────────────────────────────────────────────────

def slugify(text, asin):
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-z0-9]+", "-", text.lower())
    text = text.strip("-")[:60].rstrip("-")
    return f"{text}-{asin.lower()}"


def extract_bullets(detalles):
    """Intenta extraer bullets del campo detalles de DMSO."""
    if not detalles:
        return None
    if isinstance(detalles, list):
        return json.dumps(detalles)
    if isinstance(detalles, dict):
        # Algunos importers guardan bullets bajo la llave 'bullets'
        if "bullets" in detalles and isinstance(detalles["bullets"], list):
            return json.dumps(detalles["bullets"])
    return None

# ─── Main ─────────────────────────────────────────────────────────────────────

def main(dry_run=False):
    print("=" * 60)
    print("MIGRACIÓN: DMSO candidatos CPAP → BD CPAP")
    if dry_run:
        print("  [DRY RUN — no se escribirá nada]")
    print("=" * 60)

    # 1. Leer CSV
    if not CSV_PATH.exists():
        print(f"ERROR: No se encontró el CSV en {CSV_PATH}")
        sys.exit(1)

    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    asins_csv = {r["ASIN"]: float(r["Precio Asignado"]) for r in rows}
    print(f"\nCSV cargado: {len(asins_csv)} productos")

    # 2. Conectar a ambas BDs
    print("\nConectando a DMSO Neon...", end=" ")
    conn_dmso = psycopg2.connect(**DMSO_DB)
    cur_dmso = conn_dmso.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    print("OK")

    print("Conectando a CPAP Neon...", end=" ")
    conn_cpap = psycopg2.connect(**CPAP_DB)
    cur_cpap = conn_cpap.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    print("OK")

    # 3. Traer datos completos desde DMSO
    asin_list = list(asins_csv.keys())
    cur_dmso.execute("""
        SELECT asin, titulo, slug, descripcion, imagenes, detalles, reviews
        FROM productos
        WHERE asin = ANY(%s)
    """, (asin_list,))
    dmso_products = {r["asin"]: r for r in cur_dmso.fetchall()}
    print(f"\nProductos encontrados en DMSO BD: {len(dmso_products)} / {len(asin_list)}")

    asins_sin_datos = set(asin_list) - set(dmso_products.keys())
    if asins_sin_datos:
        print(f"  ⚠ Sin datos en DMSO (solo CSV): {sorted(asins_sin_datos)}")

    # 4. Ver cuáles ya existen en CPAP
    cur_cpap.execute("SELECT asin FROM productos WHERE asin = ANY(%s)", (asin_list,))
    ya_en_cpap = {r["asin"] for r in cur_cpap.fetchall()}
    print(f"Ya existen en CPAP Neon:  {len(ya_en_cpap)}")

    # 5. Preparar e insertar los nuevos
    a_insertar = [a for a in asin_list if a not in ya_en_cpap]
    print(f"A insertar:               {len(a_insertar)}")

    insertados = 0
    solo_csv   = 0
    errores    = 0

    for asin in a_insertar:
        precio_mxn = asins_csv[asin]

        if asin in dmso_products:
            p = dmso_products[asin]
            titulo     = p["titulo"]
            slug       = slugify(titulo, asin)
            descripcion = p["descripcion"]
            imagenes   = json.dumps(p["imagenes"]) if p["imagenes"] else "[]"
            bullets    = extract_bullets(p["detalles"])
            reviews    = json.dumps(p["reviews"]) if p["reviews"] else "[]"
        else:
            # Solo tenemos el CSV (sin imagen ni descripción)
            titulo      = next(r["Titulo"] for r in rows if r["ASIN"] == asin)
            slug        = slugify(titulo, asin)
            descripcion = None
            imagenes    = "[]"
            bullets     = None
            reviews     = "[]"
            solo_csv   += 1

        if dry_run:
            print(f"  [DRY] INSERT  {asin}  ${precio_mxn:.2f}  {titulo[:55]}...")
            continue

        try:
            cur_cpap.execute("""
                INSERT INTO productos
                    (asin, titulo, slug, descripcion, bullets, precio,
                     imagenes, reviews, activo, destacado)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, false, false)
                ON CONFLICT (asin) DO NOTHING
            """, (
                asin, titulo, slug, descripcion,
                bullets, str(precio_mxn),
                imagenes, reviews,
            ))
            insertados += 1
            print(f"  ✓ {asin}  ${precio_mxn:.2f}  {titulo[:55]}...")
        except Exception as e:
            errores += 1
            print(f"  ✗ ERROR {asin}: {e}")

    if not dry_run:
        conn_cpap.commit()

    # ─── Resumen ───────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("RESUMEN")
    print(f"  Total en CSV:            {len(asin_list)}")
    print(f"  Ya estaban en CPAP:      {len(ya_en_cpap)}")
    print(f"  Insertados ahora:        {insertados}")
    print(f"  Solo desde CSV (sin img):{solo_csv}")
    print(f"  Errores:                 {errores}")
    if dry_run:
        print("  [DRY RUN — nada fue escrito]")
    print("=" * 60)

    cur_dmso.close(); conn_dmso.close()
    cur_cpap.close(); conn_cpap.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    main(dry_run=args.dry_run)
