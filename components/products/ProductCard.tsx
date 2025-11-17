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
}

export default function ProductCard({
  id,
  name,
  material,
  price,
  imageUrl,
  isCertified = true,
  onQuote,
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
        <Button size="sm" className="h-10" onClick={() => onQuote?.(id)}>
          Cotizar
        </Button>
      </div>
    </Card>
  );
}
