import Image from "next/image";

interface IconProps {
  size?: number;
  className?: string;
}

export const BiodegradableIcon = ({ size = 24, className = "" }: IconProps) => (
  <Image
    src="/icons/eco.svg"
    alt="Biodegradable icon"
    width={size}
    height={size}
    className={className}
  />
);

export const CertificationIcon = ({ size = 24, className = "" }: IconProps) => (
  <Image
    src="/icons/check.svg"
    alt="Certification icon"
    width={size}
    height={size}
    className={className}
  />
);

export const QualityIcon = ({ size = 24, className = "" }: IconProps) => (
  <Image
    src="/icons/medal.svg"
    alt="Quality icon"
    width={size}
    height={size}
    className={className}
  />
);
