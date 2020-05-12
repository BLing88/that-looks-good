import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
declare global {
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}
global.fetch = fetch;
require("dotenv").config();
const unsplash = new Unsplash({
  accessKey: `${process.env.API_KEY}`,
  secret: `${process.env.SECRET}`,
});

interface Dish {
  id: string;
  urls: {
    raw: string;
  };
  user: {
    username: string;
    name: string;
    links: { html: string };
  };
}

const getDish = async (_: any, { dishId }: { dishId: string }) => {
  try {
    const dish: Dish = await unsplash.photos.getPhoto(dishId).then(toJson);
    return {
      dishId: dish.id,
      urls: {
        raw: dish.urls.raw,
      },
      user: {
        username: dish.user.username,
        name: dish.user.name,
        htmlUrl: dish.user.links.html,
      },
    };
  } catch (err) {
    throw new Error(`Error getting dish: ${err}`);
  }
};

export { getDish };
