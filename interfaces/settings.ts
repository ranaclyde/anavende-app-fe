export interface Setting {
  id: number
  documentId: string
  title: string
  email: string
  phone: string
  address: string
  facebook?: string
  instagram?: string
  tiktok?: string
  maintenance?: boolean
  latitude: number
  longitude: number
  shippingRates: ShippingRate[]
}

export interface ShippingRate {
  id: number
  label: string
  maxKm: number
  price: number
}
