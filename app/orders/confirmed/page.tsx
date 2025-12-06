import Link from "next/link";

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos 
            una confirmación por correo electrónico.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Revisa tu correo para más detalles</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-green-600 text-white py-3 px-8 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 py-3 px-8 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


