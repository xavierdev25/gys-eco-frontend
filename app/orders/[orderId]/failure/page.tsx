"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailurePage() {
  const params = useParams();
  const orderId = params.orderId as string;

  useEffect(() => {
    // Notify the original checkout page that payment failed
    const paymentResult = {
      orderId,
      status: "failure",
      timestamp: Date.now(),
    };

    localStorage.setItem("mp_payment_result", JSON.stringify(paymentResult));

    try {
      const channel = new BroadcastChannel("payment_status");
      channel.postMessage(paymentResult);
      channel.close();
    } catch (e) {
      // BroadcastChannel not supported
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-2">
              Pago Rechazado
            </h1>
            <p className="text-gray-600 mb-4">
              No se pudo procesar el pago para el pedido{" "}
              <span className="font-semibold">{orderId}</span>.
            </p>
            <p className="text-sm text-gray-500">
              Por favor intenta nuevamente o usa otro método de pago.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/checkout"
              className="w-full bg-[#1a4231] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#1a4231]/90 transition-colors text-center"
            >
              Intentar de nuevo
            </Link>
            <Link
              href="/products"
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
