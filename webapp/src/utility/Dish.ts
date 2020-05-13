interface Photo {
  id: string;
  url: string;
  photographer: string;
  username: string;
  photographerProfileURL: string;
}

export interface Dish {
  name: string;
  category: string;
  photo: Photo;
}

export interface DatabaseDish {
  name: string;
  category: string;
  id: string;
}

export interface UnsplashDish {
  dishId: string;
  user: {
    name: string;
    username: string;
    htmlUrl: string;
  };
  urls: {
    raw: string;
  };
}
