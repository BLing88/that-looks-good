interface Photo {
  id: string;
  url: string;
  photographer: string;
  photographerProfileURL: string;
}

export interface Dish {
  name: string;
  category: string;
  photo: Photo;
}
