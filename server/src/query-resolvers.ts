import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
require("dotenv").config();
const unsplash = new Unsplash({ accessKey: `${process.env.API_KEY}` });

interface Dish {
  id: string;
  urls: {
    custom: string;
  };
  user: {
    username: string;
    name: string;
    portfolio_url: string;
  };
}

const getDish = async (_: any, { dishId }: { dishId: string }) => {
  try {
    const dish: Dish = await unsplash.photos.getPhoto(dishId).then(toJson);
    return {
      dishId: dish.id,
      urls: {
        custom: dish.urls.custom,
      },
      user: {
        username: dish.user.username,
        name: dish.user.name,
        portfolio_url: dish.user.portfolio_url,
      },
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error getting dish");
  }
};

export { getDish };
