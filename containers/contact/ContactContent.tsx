'use client'

import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Location01Icon,
  Mail01Icon,
  Call02Icon,
  FacebookIcon,
  InstagramIcon,
  WhatsappBusinessIcon,
} from '@hugeicons/core-free-icons'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Container from '@/components/ui/Container'

import useSettingsStore from '@/store/settings'

const ContactContent = () => {
  const settings = useSettingsStore((state) => state.settings)

  if (!settings) return null

  return (
    <main>
      <Breadcrumbs links={[{ href: '#', label: 'Contacto' }]} />
      <Container tag="section" className="mt-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de contacto
            </h2>

            <div className="space-y-6">
              {/* Dirección */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-merlot-50 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    size={24}
                    className="text-merlot"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Dirección
                  </h3>
                  <p className="text-gray-600">Viedma, Río Negro</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-merlot-50 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={WhatsappBusinessIcon}
                    size={24}
                    className="text-merlot"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-merlot hover:text-merlot-700 transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-merlot-50 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={24}
                    className="text-merlot"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-merlot hover:text-merlot-700 transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-merlot-50 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={FacebookIcon}
                    size={24}
                    className="text-merlot"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Facebook</h3>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-merlot hover:text-merlot-700 transition-colors"
                  >
                    {settings.facebook}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-merlot-50 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={InstagramIcon}
                    size={24}
                    className="text-merlot"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Instagram
                  </h3>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-merlot hover:text-merlot-700 transition-colors"
                  >
                    {settings.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cómo contactarnos */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ¿Cómo podemos ayudarte?
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Estamos aquí para responder todas tus consultas sobre nuestros
                productos. Puedes contactarnos de la manera que te resulte más
                cómoda.
              </p>

              <div className="space-y-4">
                <div className="bg-merlot-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={20}
                      className="text-merlot"
                    />
                    Llamanos o envianos un WhatsApp
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comunicate directamente con nosotros para resolver tus dudas
                    al instante. También podes enviarnos un mensaje por WhatsApp
                    y te responderemos a la brevedad.
                  </p>
                </div>

                <div className="bg-hippie-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={20}
                      className="text-hippie-blue"
                    />
                    Escribinos por email
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Si preferís enviarnos un email con tu consulta, te
                    responderemos lo antes posible con toda la información que
                    necesites sobre nuestros productos.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      size={20}
                      className="text-gray-700"
                    />
                    Visitanos
                  </h3>
                  <p className="text-gray-600 text-sm">
                    También podes coordinar una visita previa en nuestra
                    ubicación en Viedma, Río Negro. Contactanos para acordar el
                    mejor horario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default ContactContent
