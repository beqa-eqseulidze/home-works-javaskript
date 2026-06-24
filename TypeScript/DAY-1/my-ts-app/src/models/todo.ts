export interface ITodoWithoutId {
  title: string;
  category: CategoryTypes;
}

export interface ITodo extends ITodoWithoutId{
  id:number
}

export type CategoryTypes = "fun" | "learn";