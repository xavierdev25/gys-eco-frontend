"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import Button from "../ui/Button";
import Sheet, {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/Sheet";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    total,
    itemCount,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const formatPrice = (price: number) => {
    return `S/ ${price.toFixed(2)}`;
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Sheet isOpen={isOpen} onClose={closeCart} side="right">
      <SheetClose onClose={closeCart} />

      <SheetHeader>
        <SheetTitle>Carrito de Compras</SheetTitle>
        <SheetDescription>
          {itemCount === 0
            ? "Tu carrito está vacío"
            : `${itemCount} producto${
                itemCount !== 1 ? "s" : ""
              } en tu carrito`}
        </SheetDescription>
      </SheetHeader>

      <SheetContent>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-[#1a4231]/60 text-sm">
              Agrega productos a tu carrito para empezar a comprar
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">
                          Sin imagen
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#1a4231] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-[#1a4231]/60">
                      {formatPrice(item.product.price)} c/u
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#1a4231] transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg leading-none">−</span>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#1a4231] transition-colors"
                      >
                        <span className="text-lg leading-none">+</span>
                      </button>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto text-red-500 hover:text-red-600 p-1"
                        title="Eliminar"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1a4231]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-[#1a4231]">
                  Total
                </span>
                <span className="text-xl font-bold text-[#1a4231]">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceder al pago
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

