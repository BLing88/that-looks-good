import Unsplash, { toJson } from "unsplash-js";
import fetch from "node-fetch";
import { getAuthorization } from "./getAuthorization";
import { ServerContext } from "./getAuthorization";
declare global {
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}
global.fetch = fetch;
const unsplash = new Unsplash({
  accessKey: `${process.env.API_KEY}`,
  secret: `${process.env.SECRET}`,
});

interface UnsplashResponse {
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
interface UnsplashDish {
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

const getDish = async (
  _: undefined,
  { dishId }: { dishId: string },
  context: ServerContext
): Promise<UnsplashDish> => {
  const { isAuthorized } = await getAuthorization(context);
  if (isAuthorized) {
    try {
      const dish: UnsplashResponse = await unsplash.photos
        .getPhoto(dishId)
        .then(toJson);
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
  } else {
    throw new Error(`You are not authorized.`);
  }
};

export { getDish };
