"""
generar_csv_revision_cpap.py
Regenera cpap_candidates.csv con precio USD estimado (fórmula inversa)
y link directo a Amazon para que Arturo pueda revisar cada producto.

Columnas del CSV generado:
  ASIN, Titulo, Precio_USD_estimado, Precio_MXN_sugerido, Link_Amazon

Fórmula inversa:
  precio_mxn = ((usd * 1.08 * 1.25) * 19 + 250) * 1.30
  → usd = (precio_mxn / 1.30 - 250) / (1.08 * 1.25 * 19)

Uso:
    python scripts/generar_csv_revision_cpap.py
"""

import csv
import psycopg2
import psycopg2.extras
from pathlib import Path

DMSO_DB = {
    "host":     "ep-broad-leaf-aneazel2-pooler.c-6.us-east-1.aws.neon.tech",
    "dbname":   "neondb",
    "user":     "neondb_owner",
    "password": "npg_toOvKURuY4n2",
    "sslmode":  "require",
    "connect_timeout": 30,
}

# Factores de la fórmula de precio
TAX_TEXAS    = 1.08
IMPORT_FEE   = 1.25
TC_USD_MXN   = 19
ENVIO_MXN    = 250
GANANCIA     = 1.30
FACTOR       = TAX_TEXAS * IMPORT_FEE * TC_USD_MXN   # = 25.65

CSV_IN  = Path(__file__).parent.parent / "scratch" / "cpap_candidates.csv"
CSV_OUT = Path(__file__).parent.parent / "scratch" / "cpap_revision.csv"


def mxn_to_usd(precio_mxn):
    """Aplica la fórmula inversa para estimar el costo en USD."""
    usd = (float(precio_mxn) / GANANCIA - ENVIO_MXN) / FACTOR
    return round(max(usd, 0), 2)


def main():
    print("Conectando a DMSO Neon...", end=" ", flush=True)
    conn = psycopg2.connect(**DMSO_DB)
    cur  = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    print("OK")

    # Leer CSV original
    with open(CSV_IN, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    asins = [r["ASIN"] for r in rows]
    precio_asignado = {r["ASIN"]: float(r["Precio Asignado"]) for r in rows}

    # Traer titulo y precio real desde DMSO (por si el CSV tiene el titulo truncado)
    cur.execute("""
        SELECT asin, titulo, precio
        FROM productos
        WHERE asin = ANY(%s)
    """, (asins,))
    dmso = {r["asin"]: r for r in cur.fetchall()}
    conn.close()

    # Escribir CSV mejorado
    with open(CSV_OUT, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "ASIN",
            "Titulo",
            "Precio_USD_estimado",
            "Precio_MXN_sugerido",
            "Link_Amazon",
        ])
        for asin in asins:
            if asin in dmso:
                titulo     = dmso[asin]["titulo"]
                precio_mxn = float(dmso[asin]["precio"])
            else:
                titulo     = next(r["Titulo"] for r in rows if r["ASIN"] == asin)
                precio_mxn = precio_asignado[asin]

            usd  = mxn_to_usd(precio_mxn)
            link = f"https://www.amazon.com/dp/{asin}"

            writer.writerow([asin, titulo, usd, precio_mxn, link])
            print(f"  {asin}  ${usd:>7.2f} USD  ${precio_mxn:>8.2f} MXN  {titulo[:50]}...")

    print(f"\nCSV generado: {CSV_OUT}")
    print(f"  {len(asins)} productos")
    print("\nAbre el CSV, revisa el precio USD en Amazon con el link,")
    print("ajusta 'Precio_MXN_sugerido' si es necesario y activa los que quieras.")


if __name__ == "__main__":
    main()
