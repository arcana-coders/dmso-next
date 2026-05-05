"""
activar_cpap_aprobados.py
Lee cpap_revision.csv (revisado por Arturo) y:
  - SI            → activo=true, precio=Precio_MXN_sugerido
  - SI+CORREGIR   → activo=true, precio calculado con fórmula desde Precio_USD_estimado
  - NO            → sin cambio (activo=false)

Uso:
    python scripts/activar_cpap_aprobados.py
    python scripts/activar_cpap_aprobados.py --dry-run
"""

import csv
import sys
import argparse
import psycopg2
import psycopg2.extras
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

CPAP_DB = {
    "host":     "ep-bold-rain-anev6sr2-pooler.c-6.us-east-1.aws.neon.tech",
    "dbname":   "neondb",
    "user":     "neondb_owner",
    "password": "npg_0L9QSrBDaYsI",
    "sslmode":  "require",
    "connect_timeout": 30,
}

CSV_PATH = Path(__file__).parent.parent / "scratch" / "cpap_revision.csv"

# Fórmula de precio
TAX_TEXAS  = 1.08
IMPORT_FEE = 1.25
TC_USD_MXN = 19
ENVIO_MXN  = 250
GANANCIA   = 1.30
FACTOR     = TAX_TEXAS * IMPORT_FEE * TC_USD_MXN  # 25.65


def calcular_mxn(usd):
    return round((float(usd) * FACTOR + ENVIO_MXN) * GANANCIA, 2)


def main(dry_run=False):
    print("=" * 60)
    print("ACTIVAR CPAP APROBADOS por Arturo")
    if dry_run:
        print("  [DRY RUN]")
    print("=" * 60)

    with open(CSV_PATH, encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)

    # Parsear decisiones del CSV
    # Columnas: ASIN, Titulo, Precio_USD_estimado, Precio_MXN_sugerido, Link_Amazon, Decision, Nota
    activar   = []  # (asin, precio_mxn)
    no_change = []
    corregir  = []

    for row in rows:
        if len(row) < 6:
            continue
        asin       = row[0].strip()
        usd_est    = row[2].strip()
        mxn_sug    = row[3].strip()
        decision   = row[5].strip().upper() if len(row) > 5 else ""
        nota       = row[6].strip().upper() if len(row) > 6 else ""

        if not asin or decision == "NO" or decision == "":
            no_change.append(asin)
            continue

        if "CORREGIR" in nota or "CORREGIR" in decision:
            # Usar el USD que Arturo puso (Precio_USD_estimado corregido)
            if usd_est:
                precio = calcular_mxn(usd_est)
                corregir.append((asin, precio, float(usd_est)))
            else:
                print(f"  AVISO: {asin} marcado CORREGIR pero sin USD — usando MXN sugerido")
                if mxn_sug:
                    activar.append((asin, float(mxn_sug)))
        elif decision == "SI":
            if mxn_sug:
                activar.append((asin, float(mxn_sug)))
            elif usd_est:
                precio = calcular_mxn(usd_est)
                activar.append((asin, precio))

    print(f"\nTotal filas CSV:    {len(rows)}")
    print(f"  Activar (SI):     {len(activar)}")
    print(f"  Corregir precio:  {len(corregir)}")
    print(f"  Dejar inactivos:  {len(no_change)}")

    if dry_run:
        print("\n--- DRY RUN: lo que se haría ---")
        for asin, precio in activar:
            print(f"  SI      {asin}  -> activo=true, precio=${precio:.2f} MXN")
        for asin, precio, usd in corregir:
            print(f"  CORREGIR {asin}  -> activo=true, precio=${precio:.2f} MXN  (${usd} USD)")
        print("\n[DRY RUN — nada fue escrito]")
        return

    print("\nConectando a CPAP Neon...", end=" ")
    conn = psycopg2.connect(**CPAP_DB)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    print("OK\n")

    ok = 0
    errores = 0

    # Activar con precio sugerido
    for asin, precio in activar:
        try:
            cur.execute("""
                UPDATE productos
                SET activo = true, precio = %s
                WHERE asin = %s
            """, (str(precio), asin))
            if cur.rowcount == 0:
                print(f"  AVISO: {asin} no encontrado en BD CPAP (no se actualizó)")
            else:
                print(f"  SI      {asin}  ${precio:.2f} MXN")
                ok += 1
        except Exception as e:
            print(f"  ERROR  {asin}: {e}")
            errores += 1

    # Activar con precio corregido
    for asin, precio, usd in corregir:
        try:
            cur.execute("""
                UPDATE productos
                SET activo = true, precio = %s
                WHERE asin = %s
            """, (str(precio), asin))
            if cur.rowcount == 0:
                print(f"  AVISO: {asin} no encontrado en BD CPAP")
            else:
                print(f"  CORREGIR {asin}  ${precio:.2f} MXN  (${usd} USD)")
                ok += 1
        except Exception as e:
            print(f"  ERROR  {asin}: {e}")
            errores += 1

    conn.commit()

    # Verificar resultado
    total_activos = activar + corregir
    asins_activados = [a[0] for a in total_activos]
    cur.execute(
        "SELECT COUNT(*) AS n FROM productos WHERE activo = true AND asin = ANY(%s)",
        (asins_activados,)
    )
    confirmados = cur.fetchone()["n"]

    cur.execute("SELECT COUNT(*) AS total FROM productos WHERE activo = true")
    total_en_tienda = cur.fetchone()["total"]

    cur.close()
    conn.close()

    print("\n" + "=" * 60)
    print("RESUMEN")
    print(f"  Actualizados OK:    {ok}")
    print(f"  Errores:            {errores}")
    print(f"  Confirmados activos: {confirmados}")
    print(f"  Total activos CPAP: {total_en_tienda}")
    print("=" * 60)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    main(dry_run=args.dry_run)
