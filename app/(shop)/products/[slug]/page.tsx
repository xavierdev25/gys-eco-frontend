"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useProductStore } from "@/store/product.store";
import { useCartStore } from "@/store/cart.store";
import type { Product } from "@/types";

// Extended product type with details for display
interface ProductWithDetails extends Product {
  sku?: string;
  details?: {
    material: string;
    dimensions: string;
    thickness: string;
    color: string;
    units: string;
    use: string;
  };
  gallery?: string[];
}

// Fallback detailed products data
const detailedProducts: ProductWithDetails[] = [
  {
    id: "1",
    name: "Vaso Biodegradable 12oz",
    slug: "vaso-biodegradable-12oz",
    sku: "VB-12-PLA",
    material: "PLA",
    price: 15.5,
    stock: 100,
    categoryId: "vasos",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M",
    isCertified: true,
    description: "Vaso transparente y resistente, ideal para bebidas frías.",
    details: {
      material: "PLA (Ácido Poliláctico)",
      dimensions: "12oz",
      thickness: "N/A",
      color: "Transparente",
      units: "50 unidades",
      use: "Bebidas frías, smoothies, jugos",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M",
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Plato Hondo Ecológico",
    slug: "plato-hondo-ecologico",
    sku: "PH-ECO-BC",
    material: "Bagazo de Caña",
    price: 22.0,
    stock: 50,
    categoryId: "platos",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI",
    isCertified: true,
    description: "Plato hondo resistente a líquidos y grasas.",
    details: {
      material: "Bagazo de Caña",
      dimensions: "15cm diámetro",
      thickness: "Rígido",
      color: "Blanco Natural",
      units: "25 unidades",
      use: "Sopas, guisos, postres",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI",
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Set de Cubiertos PLA",
    slug: "set-cubiertos-pla",
    sku: "SC-PLA-STD",
    material: "PLA",
    price: 18.9,
    stock: 200,
    categoryId: "cubiertos",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk",
    isCertified: true,
    description: "Set completo de cubiertos compostables.",
    details: {
      material: "PLA",
      dimensions: "Estándar",
      thickness: "Reforzado",
      color: "Blanco",
      units: "20 sets",
      use: "Comidas completas, eventos",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk",
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Bolsas Compostables (Rollo)",
    slug: "bolsas-compostables-rollo",
    sku: "BC-TC-3040",
    material: "Almidón de Maíz",
    price: 35.0,
    stock: 75,
    categoryId: "bolsas",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k",
    isCertified: true,
    description: "Bolsa tipo camiseta compostable y biodegradable.",
    details: {
      material: "PLA (Ácido Poliláctico) de almidón de maíz",
      dimensions: "30cm (ancho) x 40cm (alto)",
      thickness: "18 micras",
      color: "Natural / Translúcido",
      units: "100 unidades",
      use: "Supermercados, tiendas, restaurantes, uso doméstico",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQR9zgg5gyKUaiEFiYrFbFwewtYauVQGU5I4dygjqD0FvNTiPWeqH058mXvdkcLTd1TGE_rUe4kPhxWhfFeIqFgWWvx3LQD025h7VVuGPsWKEYkCJVGjZ--SpCNTW6ex98jOhqnpa_xVzsLRriOfAazAGBy74IOWpdU2SSst1IkUVKvp9vsmzlkzWRQN-PCj-lnV4REma1RlcRCpUHjsraNk6Rw6Q85RVQgzKWGtmo2YUUfFXNerqqhvjtneLmpatQFyqsM_kF1Uw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCC0SryMDGWRVtFzQqkB_H5rLmhooCaT-VRSnAshh87cVOIrtvc2qkfZPiz87ZdbUhuN9zzs075oF33XorR1CKB_UUZvX6kz1nduqYZVoGO_S1P5_vq5CeSFBSW6ITLH2aLb29ycyVRNaafF-DoklITZsK-1KfuJbq2X2PA-kwVllp0prXHRzxjhBLnmjSfpnqGTqbUSEyar1cBNUm9UXRvNP9JCUMnCio0E-6dU4lTozYrFXe95Bi0GNsyE-PIUu1y0-i8aW2RGCk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAuP5Jjyl1t8Cz9KcQ036a6S08pXbDWFXcfcWjQls3-vegeibvBuHo9v8iR90R0dJHgy0hieRlDBeiXGyoqheVZHMBFJq8BP9BUZfslXyXSR1ldR-TxJEtGKA86Xu9PNGsZobUS3KiptNiQkxeI5f5HPoMfdOgi4wz11GRazsK7ywOI-yCvFXCcN1wcqonKldsZio9YSz1DbY0SAZzUmLcmaY1XA_MFbOsd-u1jAKmrnTxeBuOOeLy_zFnwvfMrW2fBzach5ssF8LQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1vq6sHJfCW6-OMyJTV13rqeZqUoIVVWJuzcV53GlekUNREuUBYF6Z_KFFqR2MpibxSDo-ihoIJEODd-EIj_lk9nmKRfMTsKmNrvK2c2kRxBYP91MVP9TkoTTSCYN8infhcXKuajDBk7ZU7zyB4J1TP1Yuk34vwSXPDpX4KzLtJARdCIlFhFidPfBQNljUZ4_Phihyr4W93SfEjUxtapwg5RqZ5vDRIlkk7V8YSQG7a2sI-V5GxubAl95iI-phwoPsJMc-_UE7E8I",
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    name: "Empaque para Alimentos",
    slug: "empaque-alimentos",
    sku: "EA-PLA-500",
    material: "PLA",
    price: 28.5,
    stock: 120,
    categoryId: "empaques",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw",
    isCertified: true,
    description: "Empaque transparente para alimentos fríos.",
    details: {
      material: "PLA",
      dimensions: "500ml",
      thickness: "N/A",
      color: "Transparente",
      units: "50 unidades",
      use: "Ensaladas, frutas, postres",
    },
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw",
    ],
    createdAt: "",
    updatedAt: "",
  },
];

// Category names mapping
const categoryNames: Record<string, string> = {
  vasos: "Vasos",
  platos: "Platos",
  cubiertos: "Cubiertos",
  bolsas: "Bolsas Compostables",
  empaques: "Empaques",
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { products, fetchProducts } = useProductStore();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<ProductWithDetails[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      
      // First try to find in store products
      if (products.length === 0) {
        await fetchProducts();
      }
      
      // Search in store products first
      let foundProduct = products.find(
        (p) => p.id === slug || p.slug === slug
      ) as ProductWithDetails | undefined;
      
      // If not found, search in detailed products (fallback data)
      if (!foundProduct) {
        foundProduct = detailedProducts.find(
          (p) => p.id === slug || p.slug === slug
        );
      }
      
      if (foundProduct) {
        // Merge with detailed data if available
        const detailedData = detailedProducts.find(
          (p) => p.id === foundProduct!.id || p.slug === foundProduct!.slug
        );
        
        const mergedProduct: ProductWithDetails = {
          ...foundProduct,
          sku: detailedData?.sku || `SKU-${foundProduct.id.slice(0, 8).toUpperCase()}`,
          details: detailedData?.details || {
            material: foundProduct.material || "Material ecológico",
            dimensions: "Consultar",
            thickness: "Estándar",
            color: "Natural",
            units: "Consultar disponibilidad",
            use: foundProduct.description || "Uso general",
          },
          gallery: detailedData?.gallery || [foundProduct.imageUrl || ""],
        };
        
        setProduct(mergedProduct);
        
        // Get similar products
        const allProducts = [...products, ...detailedProducts];
        const uniqueProducts = allProducts.filter(
          (p, index, self) => 
            index === self.findIndex((t) => t.id === p.id) &&
            p.id !== mergedProduct.id
        );
        setSimilarProducts(uniqueProducts.slice(0, 4) as ProductWithDetails[]);
      }
      
      setIsLoading(false);
    };
    
    loadProduct();
  }, [slug, products, fetchProducts]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
    }
  };

  const handleWhatsApp = () => {
    if (product) {
      const message = encodeURIComponent(
        `Hola, me interesa el producto: ${product.name} (SKU: ${product.sku}). ¿Podrían darme más información?`
      );
      window.open(`https://wa.me/51999999999?text=${message}`, "_blank");
    }
  };

  if (isLoading) {
    return (
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-[#111815] mb-4">
            Producto no encontrado
          </h1>
          <p className="text-[#5f8676] mb-8">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1B4332] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </main>
    );
  }

  const mainImage = product.gallery?.[selectedImage] || product.imageUrl || "";
  const categoryName = categoryNames[product.categoryId] || product.categoryId;

  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            className="text-[#5f8676] text-sm font-medium leading-normal hover:text-[#1B4332] transition-colors"
            href="/"
          >
            Inicio
          </Link>
          <span className="text-[#5f8676] text-sm font-medium leading-normal">
            /
          </span>
          <Link
            className="text-[#5f8676] text-sm font-medium leading-normal hover:text-[#1B4332] transition-colors"
            href="/products"
          >
            Catálogo
          </Link>
          <span className="text-[#5f8676] text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-[#5f8676] text-sm font-medium leading-normal">
            {categoryName}
          </span>
          <span className="text-[#5f8676] text-sm font-medium leading-normal">
            /
          </span>
          <span className="text-[#111815] text-sm font-medium leading-normal">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full flex flex-col justify-end overflow-hidden bg-[#111815]/5 rounded-xl aspect-square">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-[#1B4332]"
                        : "hover:ring-2 hover:ring-[#1B4332]/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex min-w-72 flex-col gap-2 mb-6">
              <h1 className="text-[#111815] font-heading text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-[#5f8676] text-base font-normal leading-normal">
                SKU: {product.sku}
              </p>
            </div>

            {/* Technical Details */}
            <div className="border-t border-b border-[#111815]/10 py-6 mb-6">
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold text-[#111815]">
                  Detalles Técnicos
                </h3>
                <ul className="space-y-2 text-[#5f8676] text-sm list-disc list-inside">
                  <li>
                    <strong>Material:</strong> {product.details?.material}
                  </li>
                  <li>
                    <strong>Dimensiones:</strong> {product.details?.dimensions}
                  </li>
                  <li>
                    <strong>Espesor:</strong> {product.details?.thickness}
                  </li>
                  <li>
                    <strong>Color:</strong> {product.details?.color}
                  </li>
                  <li>
                    <strong>Unidades por paquete:</strong> {product.details?.units}
                  </li>
                  <li>
                    <strong>Uso recomendado:</strong> {product.details?.use}
                  </li>
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-[#111815] mb-4">
                Certificaciones
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3 text-[#5f8676]">
                  <span className="material-symbols-outlined text-3xl text-[#1B4332]">
                    eco
                  </span>
                  <span className="text-sm font-medium">100% Compostable</span>
                </div>
                <div className="flex items-center gap-3 text-[#5f8676]">
                  <span className="material-symbols-outlined text-3xl text-[#1B4332]">
                    recycling
                  </span>
                  <span className="text-sm font-medium">Biodegradable</span>
                </div>
                <div className="flex items-center gap-3 text-[#5f8676]">
                  <span className="material-symbols-outlined text-3xl text-[#1B4332]">
                    restaurant
                  </span>
                  <span className="text-sm font-medium">
                    Contacto con Alimentos
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#1B4332] text-white text-base font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-opacity"
              >
                <span className="truncate">Cotizar ahora</span>
              </button>
              <button 
                onClick={handleWhatsApp}
                className="flex-1 flex min-w-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent border-2 border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332]/10 transition-colors"
              >
                <span className="truncate">Contactar por WhatsApp</span>
              </button>
            </div>

            {/* Share Links */}
            <div className="flex items-center justify-start gap-4 mt-8 text-[#5f8676]">
              <span className="text-sm font-medium">Compartir:</span>
              <button
                aria-label="Share on Facebook"
                className="hover:text-[#1B4332] transition-colors"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  );
                }}
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>
              <button
                aria-label="Share on Twitter"
                className="hover:text-[#1B4332] transition-colors"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`,
                    "_blank"
                  );
                }}
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </button>
              <button
                aria-label="Copy link"
                className="hover:text-[#1B4332] transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Enlace copiado al portapapeles");
                }}
              >
                <span className="material-symbols-outlined text-2xl">link</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="w-full bg-[#111815]/5 py-12 md:py-20 mt-12">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-center text-[#111815]">
              Productos Similares
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((similar) => (
                <Link
                  key={similar.id}
                  href={`/products/${similar.id}`}
                  className="flex flex-col gap-4 group"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={similar.imageUrl || ""}
                      alt={similar.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-bold font-heading text-[#111815] group-hover:text-[#1B4332] transition-colors">
                      {similar.name}
                    </h3>
                    <p className="text-sm text-[#5f8676]">
                      {categoryNames[similar.categoryId] || similar.categoryId} -{" "}
                      {similar.material}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
