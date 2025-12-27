'use client'
import { useEffect } from 'react'

import Container from '@/components/ui/Container'
import ButtonUi from '@/components/ui/ButtonUi'
import LinkUi from '@/components/ui/LinkUi'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Error capturado:', error)
  }, [error])

  return (
    <Container className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">500</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          ¡Algo salió mal!
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta de
          nuevo.
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-gray-500">
            Código de error: {error.digest}
          </p>
        )}
        <div className="mt-8 flex gap-4 justify-center">
          <ButtonUi color="merlot" onClick={() => reset()}>
            Intentar de nuevo
          </ButtonUi>
          <a href="/">
            <LinkUi color="merlot" variant="outlined" href="/">
              Volver al inicio
            </LinkUi>
          </a>
        </div>
      </div>
    </Container>
  )
}
