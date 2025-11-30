import Image from "next/image";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { CertificationIcon } from "../ui/Icon";

interface ProductCardProps {
  id: string;
  name: string;
  material: string;
  price: number;
  imageUrl: string;
  isCertified?: boolean;
  onQuote?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  material,
  price,
  imageUrl,
  isCertified = true,
  onQuote,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col group p-0 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          className="w-full aspect-square object-cover"
          priority={false}
        />
        {isCertified && (
          <div className="absolute top-3 left-3">
            <Badge icon={<CertificationIcon size={16} />}>Certificado</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 gap-3">
        <p className="text-base font-bold leading-normal text-[#1a4231]">
          {name}
        </p>
        <div className="text-sm text-[#1a4231]/80">
          <p className="font-normal leading-normal">Material: {material}</p>
          <p className="font-bold leading-normal">
            Precio: S/ {price.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="h-10 flex-1" 
            onClick={() => onQuote?.(id)}
          >
            Ver detalles
          </Button>
          {onAddToCart && (
            <Button 
              size="sm" 
              variant="outline"
              className="h-10" 
              onClick={() => onAddToCart(id)}
              title="Agregar al carrito"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
