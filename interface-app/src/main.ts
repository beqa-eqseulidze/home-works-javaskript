import type { IUser, ICartItem, IOrder, category, userstatus, orderstatus, IProduct } from './interface';

function calculateDiscount(user: IUser, totalCartPrice: number): number {
    if (user.status === 'VIP') {
        return totalCartPrice * 0.15; // VIP 15%იანი ფასდაკლება
    }
    else if (user.status === 'Regular' && totalCartPrice > 100) {
        return totalCartPrice * 0.05; // Regular 5%იანუ ფასდაკლება 100+ შენაძენზე
    }
    else {
        return 0; // Guest ფასდაკლება არ არის
    }
}

// 2. შეკვეთის შექმნა
function createOrder(user: IUser, cartItems: ICartItem[]): IOrder {
    const rawTotalPrice = cartItems.reduce((sum: number, item: ICartItem) => {
        return sum + (item.product.price * item.quantity);
    }, 0);

    const discount = calculateDiscount(user, rawTotalPrice);
    const finalPrice = rawTotalPrice - discount;

    return {
        id: Math.floor(Math.random() * 100),
        user: user,
        items: cartItems,
        totalCartPrice: Number(finalPrice.toFixed(2)),
        orderstatus: 'Pending',
        createdate: new Date()
    };
}

// --- სატესტო გაშვება ---
const products: IProduct[] = [
    {
        id: 1,
        name: 'Smartphone',
        price: 550,
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Winter Hoodie',
        price: 120,
        category: 'Clothing'
    },
    {
        id: 3,
        name: 'TypeScript Guide',
        price: 45,
        category: 'Books'
    }
];
const users: IUser[] = [
    {
        id: 7,
        name: 'Saba',
        email: 'saba@example.com',
        status: 'VIP'
    },
    {
        id: 8,
        name: 'Gela',
        email: 'gela@example.com',
        status: 'Regular'
    },
    {
        id: 9,
        name: 'Jemala',
        email: 'jemala@example.com',
        status: 'Guest'
    }
];

// --- კალათების შექმნა ---

const sabaCart: ICartItem[] = [
    { product: products[0], quantity: 2 }
];
const gelaCart: ICartItem[] = [
    { product: products[1], quantity: 3 },
    { product: products[2], quantity: 1 }
];
const jemalaCart: ICartItem[] = [
    { product: products[2], quantity: 2 }
];

// --- შეკვეთების შექმნა  ---
const sabaOrder = createOrder(users[0], sabaCart);
const gelaOrder = createOrder(users[1], gelaCart);
const jemalaOrder = createOrder(users[2], jemalaCart);

// შემოწმება კონსოლში
console.log('საბას შეკვეთა:', sabaOrder);
console.log('გელას შეკვეთა:', gelaOrder);
console.log('ჯემალას შეკვეთა:', jemalaOrder);