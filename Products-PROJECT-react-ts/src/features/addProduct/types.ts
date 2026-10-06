export interface NewProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  thumbnail?: string;
}