import React from 'react'
import {
  DeliveryReturn01Icon,
  NewReleasesIcon,
  StopWatchIcon,
  TruckIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

interface FeatureItemProps {
  icon: IconSvgElement
  title: string
  description: string
  isLast?: boolean
}

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  isLast = false,
}: FeatureItemProps) => (
  <div
    className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left px-6 py-4 flex-1 ${
      !isLast ? 'sm:border-r sm:border-gray-200' : ''
    }`}
  >
    <HugeiconsIcon
      icon={Icon}
      size={35}
      color="#cf4053"
      strokeWidth={1.5}
      className="mb-2 sm:mb-0 sm:mr-4"
    />
    <div>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
)

const Features = () => {
  return (
    <section className="mt-12 flex flex-col sm:flex-row justify-center items-stretch">
      <FeatureItem
        icon={NewReleasesIcon}
        title="Productos nuevos"
        description="Cerrados y en su caja"
      />
      <FeatureItem
        icon={TruckIcon}
        title="Envíos"
        description="Viedma y Carmen de Patagones"
      />
      <FeatureItem
        icon={StopWatchIcon}
        title="Días de prueba"
        description="Tenés hasta 5 días de prueba"
      />
      <FeatureItem
        icon={DeliveryReturn01Icon}
        title="Devoluciones"
        description="Si no te funciona, lo cambiamos"
        isLast // evita la línea a la derecha del último
      />
    </section>
  )
}

export default Features
