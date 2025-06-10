export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  ingredients: string | string[]; // аль аль хувилбарыг зөвшөөрөх
  category: "Main" | "Lunch" | "Drink" | "Desserts" | "Soup" | "Salad";
  days?: string[];
  imageUrl: string;
  image: string;
  description: string;
};
