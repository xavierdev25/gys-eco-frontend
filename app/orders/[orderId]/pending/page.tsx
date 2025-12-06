"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PaymentPendingPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  useEffect(() => {
    // Notify the original checkout page that payment is pending
    const paymentResult = {
      orderId,
      status: "pending",
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
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-yellow-800 mb-2">
              Pago Pendiente
            </h1>
            <p className="text-gray-600 mb-4">
              Tu pago para el pedido{" "}
              <span className="font-semibold">{orderId}</span> está siendo
              procesado.
            </p>
            <p className="text-sm text-gray-500">
              Te notificaremos cuando se confirme el pago.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full bg-[#1a4231] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#1a4231]/90 transition-colors text-center"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
