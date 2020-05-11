interface Photo {
  id: string;
  photographer: string;
  photographerProfileURL: string;
}

export interface Dish {
  name: string;
  category: string;
  photo: Photo;
}
