export interface CartItemProps {
  name: string;
  quantity: number;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
}
