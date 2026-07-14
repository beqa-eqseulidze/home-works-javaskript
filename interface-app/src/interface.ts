export interface IProduct {
    id: number,
    name: string,
    price: number,
    category: category
};

export type category = 'Electronics' | 'Clothing' | 'Books';
export interface ICartItem {
    product: IProduct,
    quantity: number
};

export type userstatus = 'Guest' | 'Regular' | 'VIP';
export interface IUser {
    id: number,
    name: string,
    email: string,
    status: userstatus
};

export type orderstatus = ('Pending' | 'Shipped' | 'Delivered');
export interface IOrder {
    id: number,
    user: IUser,
    items: ICartItem[],
    totalCartPrice: number,
    orderstatus: orderstatus,
    createdate: Date | number
};