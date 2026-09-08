import type { User, CartItem, Order } from './models'; 

export class OrderService {
    
    public calculateDiscount(user: User, cartTotal: number): number {
        switch (user.status) {
            case 'VIP':
                return cartTotal * 0.15;
                
            case 'Regular':
                if (cartTotal > 100) {
                    return cartTotal * 0.05;
                }
                return 0;
                
            case 'Guest':
                return 0;
                
            default:
                return 0;
        }
    }

    public createOrder(user: User, items: CartItem[]): Order {
        const cartTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const discount = this.calculateDiscount(user, cartTotal);
        const finalPrice = cartTotal - discount;

        return {
            id: `ord_${Math.random().toString(36).substr(2, 9)}`,
            user: user,
            items: items,
            totalPrice: Number(finalPrice.toFixed(2)),
            status: 'Pending',
            createdAt: new Date()
        };
    }
}
