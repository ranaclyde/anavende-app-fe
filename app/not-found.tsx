import Container from '@/components/ui/Container'
import LinkUi from '@/components/ui/LinkUi'

export default function NotFound() {
  return (
    <Container className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Página no encontrada
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <LinkUi color="merlot" href="/">
            Volver al inicio
          </LinkUi>
          <LinkUi color="merlot" variant="outlined" href="/productos">
            Ver productos
          </LinkUi>
        </div>
      </div>
    </Container>
  )
}
