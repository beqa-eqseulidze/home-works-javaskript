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


































