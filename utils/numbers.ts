/**
 * Formatea un precio en pesos argentinos
 * - Si tiene decimales distintos de cero, los muestra: 2509.34 -> $2.509,34
 * - Si no tiene decimales, no los muestra: 2400 -> $2.400
 */
export function formatPrice(price: number): string {
  const hasDecimals = price % 1 !== 0

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(price)
}
