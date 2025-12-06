import Link from "next/link";

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Detalles del Pedido</h1>
            <p className="text-gray-500">Orden #{orderId.slice(0, 8).toUpperCase()}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Estado</span>
                <span className="font-semibold text-green-600">Confirmado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha</span>
                <span className="font-medium">{new Date().toLocaleDateString('es-ES')}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors text-center"
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


