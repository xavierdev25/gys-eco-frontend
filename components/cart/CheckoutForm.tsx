"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCartStore } from "@/store";

const WHATSAPP_NUMBER = "51923235616";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CheckoutForm({
  onSuccess,
  onCancel,
}: CheckoutFormProps) {
  const { items, total, clearCart } = useCartStore();
  const [error, setError] = useState<string | null>(null);

  // Form state - solo nombre y teléfono para contacto
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!customerInfo.name?.trim()) {
      setError("Por favor ingresa tu nombre");
      return false;
    }
    if (!customerInfo.phone?.trim()) {
      setError("Por favor ingresa tu teléfono");
      return false;
    }
    return true;
  };

  const generateWhatsAppMessage = (): string => {
    const productList = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} - S/${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    let message = `¡Hola! 🌿 Me gustaría hacer el siguiente pedido:

${productList}

*Total: S/${total.toFixed(2)}*

*Datos de contacto:*
📝 Nombre: ${customerInfo.name}
📱 Teléfono: ${customerInfo.phone}`;

    if (customerInfo.address.trim()) {
      message += `\n📍 Dirección: ${customerInfo.address}`;
    }

    if (customerInfo.notes.trim()) {
      message += `\n💬 Notas: ${customerInfo.notes}`;
    }

    message += "\n\n¿Está disponible?";

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setError(null);

    // Generar mensaje y abrir WhatsApp
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, "_blank");

    // Limpiar carrito y notificar éxito
    clearCart();
    onSuccess?.();
  };

  // Order summary component
  const OrderSummary = () => (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">Resumen del pedido</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.product.name} x{item.quantity}
            </span>
            <span className="font-medium">
              S/ {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 mt-3 pt-3">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-[#1a4231]">S/ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <OrderSummary />

      <div>
        <h3 className="font-semibold text-gray-800 mb-4">
          Información de contacto
        </h3>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Nombre *"
            type="text"
            placeholder="Tu nombre completo"
            value={customerInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />

          <Input
            label="Teléfono *"
            type="tel"
            placeholder="987 654 321"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />

          <Input
            label="Dirección de entrega"
            type="text"
            placeholder="Tu dirección (opcional)"
            value={customerInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4231] focus:border-transparent resize-none"
              rows={3}
              placeholder="¿Alguna indicación especial? (opcional)"
              value={customerInfo.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={items.length === 0}
          className="bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar pedido por WhatsApp
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" fullWidth onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>

      {/* WhatsApp info */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Tu pedido será enviado directamente a nuestro WhatsApp para
          coordinación
        </p>
      </div>
    </form>
  );
}
