//============ Products list ================================================//

const product1: Product = {
  id: 1,
  name: "Tablet",
  price: 1200,
  category: "Electronics",
};
const product2: Product = {
  id: 2,
  name: "jacket",
  price: 25,
  category: "Clothing",
};
const product3: Product = {
  id: 3,
  name: "History book",
  price: 17,
  category: "Books",
};

//======== users list ================================================//

const vipUser: User = {
  id: 1,
  name: "luka",
  email: "luka123@gmail.com",
  status: "VIP",
};
const regularUser: User = {
  id: 2,
  name: "gio",
  email: "gio@gmail.com",
  status: "Regular",
};
const guestUser: User = {
  id: 3,
  name: "zaza",
  email: "zaza232@gmail.com",
  status: "Guest",
};

//=================================================================

type Category = "Electronics" | "Clothing" | "Books";
type UserStatus = "Guest" | "Regular" | "VIP";
type OrderStatus = "Pending" | "Shipped" | "Delivered";

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  user: User;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
}

// Discount ;
function calculateDiscount(user: User, totalAmount: number): number {
  if (user.status === "VIP") {
    return totalAmount * 0.15;
  } else if (user.status === "Regular" && totalAmount > 100) {
    return totalAmount * 0.05;
  } else {
    return 0;
  }
}

//ორდერის შექმნა
function createOrder(user: User, items: CartItem[]): Order {
  let subtotal: number = 0;
  for (let i: number = 0; i < items.length; i++) {
    subtotal += items[i].product.price * items[i].quantity;
  }

  const discount: number = calculateDiscount(user, subtotal);
  const totalPrice: number = subtotal - discount;

  const order: Order = {
    id: Date.now(),
    user: user,
    items: items,
    totalPrice: totalPrice,
    status: "Pending",
    createdAt: new Date(),
  };

  return order;
}




// ========================================================================================================

// 1 Tablet (1200 ლარი) + 2 Jacket (25 ლარიანი)//
const testCart1: CartItem[] = [
    { product: product1, quantity: 1 },
    { product: product2, quantity: 2 }
];

//==========================================================================================================

//-------- VIP TEST -------//
const order1: Order = createOrder(vipUser, testCart1); //15% ფასდაკლება
console.log("VIP შეკვეთა - სულ:", order1.totalPrice); 
console.log("VIP ფასდაკლება :", calculateDiscount(vipUser, 1200 + 50)); //187,50 ლარი ფასდაკლება


//=============================================================================================================

//-------- Guest test -------//
const order2: Order = createOrder(guestUser, testCart1); // 0%
console.log("Guest შეკვეთა - სულ:", order2.totalPrice);  
console.log("Guest ფასდაკლება:", calculateDiscount(guestUser, 1200 + 50)); 

// ===================================================================================================================

//-------- Guest test -------//
const order3: Order = createOrder(regularUser, testCart1); //5% ფასდაკლება
console.log("Regular შეკევეთა - სულ:", order3.totalPrice); 
console.log("Regular ფასდაკლება:", calculateDiscount(regularUser, 1200 + 50)); //62.5 ლარი ფასდაკლება


// ===========================================================================================================

//Regular USER (100 ლარზე ნაკლები);;;
const testCart2: CartItem[] = [
    { product: product3, quantity: 20 } // 20 ცალი * 17 = 340 ლარი
];

const order4: Order = createOrder(regularUser, testCart2);
console.log("Regular შეკვეთა - სულ:", order4.totalPrice); // 323
console.log("Regular ფასდაკლება:", calculateDiscount(regularUser, 340)); // 17 ლარი ფასდაკლება