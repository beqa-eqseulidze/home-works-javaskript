import { type Product, type User, type CartItem } from './models'; // შესწორებული ხაზი
import { OrderService } from './orderService';

// სატესტო პროდუქტები
const laptop: Product = { id: 'p1', name: 'MacBook Air', price: 2500, category: 'Electronics' };
const tShirt: Product = { id: 'p2', name: 'Minimalist Tee', price: 45, category: 'Clothing' };
const book: Product = { id: 'p3', name: 'Clean Code', price: 60, category: 'Books' };

// სატესტო მომხმარებლები
const vipUser: User = { id: 'u1', name: 'გიორგი', email: 'gio@vip.ge', status: 'VIP' };
const regularUserHigh: User = { id: 'u2', name: 'ანი', email: 'ani@regular.ge', status: 'Regular' };
const regularUserLow: User = { id: 'u3', name: 'ლუკა', email: 'luka@regular.ge', status: 'Regular' };
const guestUser: User = { id: 'u4', name: 'სტუმარი', email: 'guest@shop.ge', status: 'Guest' };

// კალათის სცენარები
const expensiveCart: CartItem[] = [{ product: laptop, quantity: 1 }];
const cheapCart: CartItem[] = [{ product: tShirt, quantity: 1 }, { product: book, quantity: 1 }];
const veryCheapCart: CartItem[] = [{ product: tShirt, quantity: 1 }];

// სერვისის გაშვება
const orderService = new OrderService();

console.log('--- ORDER SYSTEM TESTING --- \n');

// 1. VIP ტესტი
const vipOrder = orderService.createOrder(vipUser, expensiveCart);
console.log(`VIP მყიდველი: ${vipUser.name} -> საბოლოო ფასი: ${vipOrder.totalPrice} ლარი`);

// 2. Regular (> 100 ლარი) ტესტი
const regularOrderHigh = orderService.createOrder(regularUserHigh, cheapCart);
console.log(`Regular (>100ლ): ${regularUserHigh.name} -> საბოლოო ფასი: ${regularOrderHigh.totalPrice} ლარი`);

// 3. Regular (< 100 ლარი) ტესტი
const regularOrderLow = orderService.createOrder(regularUserLow, veryCheapCart);
console.log(`Regular (<100ლ): ${regularUserLow.name} -> საბოლოო ფასი: ${regularOrderLow.totalPrice} ლარი`);

// 4. Guest ტესტი
const guestOrder = orderService.createOrder(guestUser, expensiveCart);
console.log(`Guest მყიდველი: ${guestUser.name} -> საბოლოო ფასი: ${guestOrder.totalPrice} ლარი`);
