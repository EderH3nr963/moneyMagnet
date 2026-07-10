import {
  TrendingUp,
  Landmark,
  ChartNoAxesCombined,
  ArrowRightLeft,
  Send,
  Scale,
  Wrench,
  ShoppingBag,
  Smartphone,
  ShoppingCart,
  Utensils,
  Plane,
  HeartHandshake,
  Dice5,
  ReceiptText,
  BadgeDollarSign,
  House,
  HeartPulse,
  Car,
  ShieldCheck,
  Gamepad2,
  Ellipsis,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  landmark: Landmark,
  "chart-no-axes-combined": ChartNoAxesCombined,
  "arrow-right-left": ArrowRightLeft,
  send: Send,
  scale: Scale,
  wrench: Wrench,
  "shopping-bag": ShoppingBag,
  smartphone: Smartphone,
  "shopping-cart": ShoppingCart,
  utensils: Utensils,
  plane: Plane,
  "heart-handshake": HeartHandshake,
  "dice-5": Dice5,
  "receipt-text": ReceiptText,
  "badge-dollar-sign": BadgeDollarSign,
  house: House,
  "heart-pulse": HeartPulse,
  car: Car,
  "shield-check": ShieldCheck,
  "gamepad-2": Gamepad2,
  ellipsis: Ellipsis,
};

type DynamicIconProps = {
  name: string | null | undefined;
  size?: number;
  className?: string;
};

export function DynamicIcon({
  name,
  size = 20,
  className,
}: DynamicIconProps) {
  const normalizedName = name?.trim().toLowerCase() ?? "";

  const Icon = iconMap[normalizedName] ?? CircleHelp;

  return <Icon size={size} className={className} />;
}