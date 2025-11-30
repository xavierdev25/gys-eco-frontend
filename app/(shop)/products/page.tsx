"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import Button from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Section";
import { useProductStore } from "@/store/product.store";
import { useFiltersStore } from "@/store/filters.store";
import { useCartStore } from "@/store/cart.store";

const filterOptions = [
  { id: "all", label: "Todos" },
  { id: "vasos", label: "Vasos" },
  { id: "platos", label: "Platos" },
  { id: "cubiertos", label: "Cubiertos" },
  { id: "bolsas", label: "Bolsas" },
  { id: "empaques", label: "Empaques" },
];

export default function ProductsPage() {
  const router = useRouter();
  
  // Product store
  const { 
    products, 
    isLoading, 
    error, 
    isUsingFallback,
    fetchProducts, 
    fetchCategories,
  } = useProductStore();
  
  // Filters store
  const { selectedCategory, setCategory, clearFilters } = useFiltersStore();
  
  // Cart store
  const { addItem } = useCartStore();

  // Cargar productos y categorías al montar
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleQuote = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product, 1);
    }
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.categoryId === selectedCategory);

  // Loading state
  if (isLoading && products.length === 0) {
    return (
      <main className="flex flex-col gap-8 py-8 md:py-12">
        <div className="px-4 md:px-10">
          <SectionHeader
            title="Nuestro Catálogo"
            description="Cargando productos..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-square mb-4"></div>
              <div className="bg-gray-200 h-6 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <main className="flex flex-col gap-8 py-8 md:py-12">
        <div className="px-4 md:px-10">
          <SectionHeader
            title="Error"
            description={error}
          />
        </div>
        <div className="flex justify-center">
          <Button onClick={() => fetchProducts()}>
            Reintentar
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 py-8 md:py-12">
      {/* Header Section */}
      <div className="px-4 md:px-10">
        <SectionHeader
          title="Nuestro Catálogo"
          description="Explora nuestra selección de productos certificados y amigables con el medio ambiente."
        />
        {isUsingFallback && (
          <p className="text-sm text-amber-600 mt-2">
            ⚠️ Mostrando datos de demostración. Conecta el backend para ver productos reales.
          </p>
        )}
      </div>

      {/* Filters Section */}
      <ProductFilters
        options={filterOptions}
        selectedId={selectedCategory}
        onSelect={setCategory}
        className="px-4 md:px-10"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={`${selectedCategory}-${product.id}`}
            id={product.id}
            name={product.name}
            material={product.material || "Ecológico"}
            price={product.price}
            imageUrl={product.imageUrl || "https://via.placeholder.com/400"}
            isCertified={product.isCertified ?? true}
            onQuote={handleQuote}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col p-4 px-4 md:px-10">
          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#1a4231]/20 px-6 py-14">
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-center text-[#1a4231]">
                No se encontraron más productos
              </p>
              <p className="text-sm font-normal leading-normal max-w-[480px] text-center text-[#1a4231]/80">
                Intenta con otra categoría o borra los filtros de búsqueda para
                ver todo nuestro catálogo.
              </p>
            </div>
            <Button variant="outline" onClick={handleClearFilters}>
              Ver todos los productos
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
