export type ProductCategory = 'Electronics' | 'Clothing' | 'Books';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type UserStatus = 'Guest' | 'Regular' | 'VIP';

export interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export interface Order {
    id: string;
    user: User;
    items: CartItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
}
