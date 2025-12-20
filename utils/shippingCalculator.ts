// Coordenadas de tu local en Viedma, Río Negro
const STORE_LOCATION = {
  lat: -40.8135,
  lng: -62.9967,
  address: 'Florentino Ameghino 772 Viedma, Río Negro',
}

// Tarifas de envío por rango de distancia (en km)
export const SHIPPING_RATES = [
  { maxKm: 0.5, price: 3000, label: 'Zona 1' },
  { maxKm: 1, price: 4500, label: 'Zona 2' },
  { maxKm: 3, price: 6000, label: 'Zona 3' },
  { maxKm: 5, price: 8000, label: 'Zona 4' },
  { maxKm: Infinity, price: 0, label: 'Fuera de zona de cobertura' },
]

interface Coordinates {
  lat: number
  lng: number
}

/**
 * Calcula la distancia entre dos coordenadas usando la fórmula de Haversine
 * Retorna la distancia en kilómetros
 */
export function calculateDistance(
  coords1: Coordinates,
  coords2: Coordinates
): number {
  const R = 6371 // Radio de la Tierra en km
  const dLat = toRad(coords2.lat - coords1.lat)
  const dLng = toRad(coords2.lng - coords1.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) *
      Math.cos(toRad(coords2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Geocodifica una dirección usando Nominatim (OpenStreetMap)
 * Retorna las coordenadas o null si no se encuentra
 */
export async function geocodeAddress(
  address: string
): Promise<Coordinates | null> {
  try {
    // Si el usuario ya especificó la ciudad, usar su dirección tal cual
    // Si no, agregar "Río Negro, Argentina" para acotar la búsqueda a la región
    let query = address.trim()

    // Verificar si ya incluye la ciudad (Viedma, Carmen de Patagones, El Cóndor, San Javier)
    const hasCity =
      /viedma|carmen de patagones|patagones|el c[oó]ndor|condor|san javier/i.test(
        query
      )

    if (!hasCity) {
      query = `${query}, Viedma, Río Negro, Argentina`
    } else {
      query = `${query}, Argentina`
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&limit=1&countrycodes=ar`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Anavende-App', // Requerido por Nominatim
      },
    })

    if (!response.ok) {
      throw new Error('Error al geocodificar la dirección')
    }

    const data = await response.json()

    if (data.length === 0) {
      return null
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    }
  } catch (error) {
    console.error('Error geocoding:', error)
    return null
  }
}

/**
 * Calcula el costo de envío basado en la distancia
 */
export function calculateShippingCost(distanceKm: number): number {
  const rate = SHIPPING_RATES.find((r) => distanceKm <= r.maxKm)
  return rate?.price || 0
}

/**
 * Obtiene el label de la zona según la distancia
 */
export function getShippingZoneLabel(distanceKm: number): string {
  const rate = SHIPPING_RATES.find((r) => distanceKm <= r.maxKm)
  return rate?.label || 'Fuera de zona'
}

/**
 * Calcula el envío completo desde una dirección
 */
export async function calculateShippingFromAddress(address: string): Promise<{
  success: boolean
  distance?: number
  shippingCost?: number
  zoneLabel?: string
  error?: string
}> {
  if (!address.trim()) {
    return { success: false, error: 'Debes ingresar una dirección' }
  }

  const coords = await geocodeAddress(address)

  if (!coords) {
    return {
      success: false,
      error:
        'No se pudo encontrar la dirección. Verifica que sea de Viedma o alrededores.',
    }
  }

  const distance = calculateDistance(STORE_LOCATION, coords)
  const shippingCost = calculateShippingCost(distance)
  const zoneLabel = getShippingZoneLabel(distance)

  if (shippingCost === 0) {
    return {
      success: false,
      error: 'Lo sentimos, no realizamos envíos a esa distancia.',
    }
  }

  return {
    success: true,
    distance: Math.round(distance * 10) / 10, // Redondear a 1 decimal
    shippingCost,
    zoneLabel,
  }
}

export { STORE_LOCATION }
