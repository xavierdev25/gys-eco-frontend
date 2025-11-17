"use client";

import React, { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import Button from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Section";

const products = [
  {
    id: "1",
    name: "Vaso Biodegradable 12oz",
    material: "PLA",
    price: 15.5,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M",
    category: "vasos",
    isCertified: true,
  },
  {
    id: "2",
    name: "Plato Hondo Ecológico",
    material: "Bagazo de Caña",
    price: 22.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI",
    category: "platos",
    isCertified: true,
  },
  {
    id: "3",
    name: "Set de Cubiertos PLA",
    material: "PLA",
    price: 18.9,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk",
    category: "cubiertos",
    isCertified: true,
  },
  {
    id: "4",
    name: "Bolsas Compostables (Rollo)",
    material: "Almidón de Maíz",
    price: 35.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k",
    category: "bolsas",
    isCertified: true,
  },
  {
    id: "5",
    name: "Empaque para Alimentos",
    material: "PLA",
    price: 28.5,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw",
    category: "empaques",
    isCertified: true,
  },
];

const filterOptions = [
  { id: "all", label: "Todos" },
  { id: "vasos", label: "Vasos" },
  { id: "platos", label: "Platos" },
  { id: "cubiertos", label: "Cubiertos" },
  { id: "bolsas", label: "Bolsas" },
  { id: "empaques", label: "Empaques" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleQuote = (productId: string) => {
    console.log("Cotizar producto:", productId);
    // Implementar lógica de cotización
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="flex flex-col gap-8 py-8 md:py-12">
      {/* Header Section */}
      <div className="px-4 md:px-10">
        <SectionHeader
          title="Nuestro Catálogo"
          description="Explora nuestra selección de productos certificados y amigables con el medio ambiente."
        />
      </div>

      {/* Filters Section */}
      <ProductFilters
        options={filterOptions}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
        className="px-4 md:px-10"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={`${selectedCategory}-${product.id}`}
            id={product.id}
            name={product.name}
            material={product.material}
            price={product.price}
            imageUrl={product.imageUrl}
            isCertified={product.isCertified}
            onQuote={handleQuote}
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
