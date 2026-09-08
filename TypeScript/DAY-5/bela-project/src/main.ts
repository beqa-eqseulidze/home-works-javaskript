<<<<<<< HEAD
// interface IPerson{
//   birthYear:number;
//   name:string;
//   phones:string[];
//   banckAccount?: string;
// }

// const person1:IPerson={
//   birthYear:2015,
//   name:"ana",
//   phones:["898-66-89-61", "579-43-33-33"],
// }
// const person2:IPerson={
//   birthYear:2001,
//   name:"nini",
//   phones:["898-66-99-61", "579-43-73-33"],
//   banckAccount:"TB258989749GEL467857896"
// }
// function getPersonAge(pers){
//   return new Date().getFullYear()-pers.birthYear
// }






export type Category = 'Electronics' | 'Clothing' | 'Books';
export type Status = 'Guest' | 'Regular' | 'VIP';
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';


export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

export interface CartItem {
  product: Product;   
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: Status;
}

export interface Order {
  id: number;
  user: User;                 
  productList: CartItem[];    
  sumPrice: number;
  orderStatus: OrderStatus;   
  createDate: Date;           
}


export function calculateDiscount(user: User, totalAmount: number): number {
    switch (user.status) {
        case 'VIP':
            return totalAmount * 0.15; 
        case 'Regular':
            return totalAmount > 100 ? totalAmount * 0.05 : 0; 
        case 'Guest':
default:
            return 0; 
    }
}


































=======
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
>>>>>>> 70275098f4c02ec5a1fb6e9f28f7fed21ed83a45
