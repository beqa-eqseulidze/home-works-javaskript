export interface ITodoWithoutId {
    title: string;
    category: CategoryTypes;
}

export interface ITodo extends ITodoWithoutId {
    id: number
}

export type CategoryTypes = "fun" | "learn";

// interface IUser {
//     id: number,
//     name: string,
//     age?: number
// };

// const user_1: IUser = {
//     id: 1,
//     name: 'Saba',
//     age: 25
// };

// const user_2: IUser = {
//     id: 2,
//     name: 'Luka',
//     age: 18
// };

// //any
// let user_3: any = { id: 1 };
// let user_4: unknown = { name: 'kaxi' };
// user_3 = 1;
// user_4 = 15;

// const fn2: unknown = function () { return true };

// if (typeof fn2 == 'function') {
//     fn2();
// };