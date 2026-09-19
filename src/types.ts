export interface MenuItem {
  id: string;
  nameAr: string;
  categoryId: string;
  price: number; // in Iraqi Dinars (IQD)
  description?: string;
  image: string;
  badge?: string;
  sizes?: { label: string; price: number }[];
  flavors?: string[];
  sauces?: string[];
  options?: { label: string; choices: string[] }[];
}

export interface Category {
  id: string;
  nameAr: string;
  iconName: string;
  description?: string;
  bannerImage?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  selectedSize?: { label: string; price: number };
  selectedFlavor?: string;
  selectedSauce?: string;
  selectedOptions?: Record<string, string>;
  quantity: number;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'served';

export interface OrderRating {
  serviceRating: number; // 1 to 5 stars
  foodRating: number; // 1 to 5 stars
  comment?: string;
  tags?: string[];
  createdAt: string;
  timestamp?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  timestamp?: number;
  status: OrderStatus;
  notes?: string;
  rating?: OrderRating;
}

export interface BranchInfo {
  name: string;
  address: string;
  phone: string;
}
