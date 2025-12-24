'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  FavouriteIcon,
  ShoppingCartAdd02Icon,
  ShoppingCartFavorite02Icon,
  Share08Icon,
  ArrowLeft01Icon,
} from '@hugeicons/core-free-icons'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { useShallow } from 'zustand/shallow'
import { clsx } from 'clsx'

import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ButtonUi from '@/components/ui/ButtonUi'
import CartDrawer from '@/components/CartDrawer'
//import ProductCard from '@/components/ProductCard'
import ImageViewer from './components/ImageViewer'
import PaymentMethods from './components/PaymentMethods'
import ColorButtons from './components/ColorButtons'
import UnitySelect from './components/UnitySelect'

import { type SimpleProduct } from '@/interfaces/products'
import useShoppingCartStore from '@/store/shoppingCart'
import { useRouter } from 'next/navigation'

interface Props {
  product: SimpleProduct
}

export default function ProductDetailContent({ product }: Props) {
  const router = useRouter()
  const [selectedStockIndex, setSelectedStockIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)

  const { setItem, shoppingCart } = useShoppingCartStore(
    useShallow((state) => ({
      setItem: state.setItem,
      shoppingCart: state.shoppingCart,
    }))
  )

  const selectedStock = product.stock[selectedStockIndex]
  const availableQuantity = selectedStock.quantity
  const currentImages = selectedStock.images
  const inStock = availableQuantity > 0

  // Verificar si el producto ya está en el carrito
  const isInCart = shoppingCart.items.some(
    (item) => item.productId === product.id
  )

  // Calcular precio con descuento si aplica
  const finalPrice = useMemo(() => {
    if (product.discount && product.discount > 0) {
      return product.price * (1 - product.discount / 100)
    }
    return product.price
  }, [product.price, product.discount])

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment' && quantity < availableQuantity) {
      setQuantity(quantity + 1)
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleStockChange = (index: number) => {
    setSelectedStockIndex(index)
    setSelectedImageIndex(0)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!inStock) return
    if (isInCart) {
      setCartOpen(true)
      return
    }

    const imageUrl =
      currentImages.length > 0
        ? currentImages[0].url
        : '/images/placeholder.jpg'

    setItem({
      productId: product.id,
      quantity: quantity,
      price: finalPrice,
      imagenUrl: imageUrl,
      name: product.name,
      colors: selectedStock.colors,
      maxStock: availableQuantity,
      slug: product.slug,
    })

    // Resetear cantidad después de agregar
    setQuantity(1)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/carrito')
  }

  return (
    <main>
      <Breadcrumbs
        links={[
          { href: '/productos', label: 'Productos' },
          {
            href: `/productos?category=${product.categories[0]?.slug}`,
            label: product.categories[0]?.name || 'Sin Categoría',
          },
          { href: '#', label: product.name },
        ]}
      />

      <Container tag="section" className="mt-8">
        {/* Botón de volver */}
        <div className="mb-6">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#832833] transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            <span>Volver a productos</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <ImageViewer
            images={currentImages}
            productName={product.name}
            discount={product.discount}
            isNew={product.isNew}
            setSelectedImageIndex={setSelectedImageIndex}
            selectedImageIndex={selectedImageIndex}
          />

          {/* Información del producto */}
          <div className="space-y-4">
            <div>
              {/* Categoría, marca y botones de acción superior */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-hippie-blue text-white text-xs px-2.5 py-0.5 rounded-sm">
                    {product.categories[0]?.name || 'Sin Categoría'}
                  </span>
                  <span className="text-gray-500 text-sm">
                    por {product.brand.name}
                  </span>
                </div>
                {/*<div className="flex items-center gap-2">
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <HugeiconsIcon icon={FavouriteIcon} size={20} />
                  </button>
                  <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <HugeiconsIcon icon={Share08Icon} size={20} />
                  </button>
                </div>*/}
              </div>

              {/* Título */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-pretty">
                {product.name}
              </h1>
            </div>

            <div className="space-y-1">
              {/* Precio */}
              <div className="flex items-end gap-3">
                <span className="text-4xl text-[#832833]">
                  ${finalPrice.toFixed(2)}
                </span>
                {product.discount && product.discount > 0 ? (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                ) : null}
              </div>
              {/* Stock */}
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    'w-3 h-3 rounded-full',
                    inStock ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
                <span
                  className={clsx(
                    'text-sm',
                    inStock ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {inStock
                    ? `En stock (${availableQuantity} disponibles)`
                    : 'Sin stock'}
                </span>
              </div>
              {/* Link para medios de pago */}
              <PaymentMethods />
            </div>

            {/* Colores */}
            {product.stock.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Color:</h3>
                <div className="flex gap-2">
                  {product.stock.map((stock, index) => (
                    <ColorButtons
                      key={stock.id}
                      colors={stock.colors}
                      isSelected={selectedStockIndex === index}
                      onClick={() => handleStockChange(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad y botón de compra */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  Cantidad:
                </span>
                <UnitySelect
                  availableQuantity={availableQuantity}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
              <div className="space-y-2">
                <ButtonUi
                  color="merlot"
                  className="flex items-center justify-center gap-2 w-60"
                  disabled={!inStock || isInCart}
                  onClick={handleBuyNow}
                >
                  Comprar ahora
                </ButtonUi>
                <div className="flex items-center gap-3">
                  <ButtonUi
                    color="merlot"
                    variant="outlined"
                    className="flex items-center justify-center gap-2 w-60"
                    disabled={!inStock}
                    onClick={handleAddToCart}
                  >
                    <HugeiconsIcon
                      icon={
                        isInCart
                          ? ShoppingCartFavorite02Icon
                          : ShoppingCartAdd02Icon
                      }
                      size={20}
                    />
                    {isInCart ? 'Ver carrito' : 'Agregar al carrito'}
                  </ButtonUi>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción detallada */}
        <div className="mt-16 space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Descripción del producto
            </h3>
            <div className="space-y-6">
              <div className="text-gray-600 leading-relaxed text-lg prose prose-gray max-w-none">
                <BlocksRenderer content={product.description} />
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {/*<div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>*/}
      </Container>

      <CartDrawer visible={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  )
}
