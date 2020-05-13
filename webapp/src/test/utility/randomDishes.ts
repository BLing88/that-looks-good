import { UnsplashDish, DatabaseDish, Category } from "../../utility/Dish";
import faker from "faker";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const buildTestDatabaseDish = (
  overrides: { id?: string; name?: string; category?: string } = {}
): DatabaseDish => {
  return {
    id: overrides.id ? overrides.id : faker.random.uuid(),
    name: overrides.name ? overrides.name : faker.commerce.productName(),
    category: overrides.category
      ? overrides.category
      : Category[getRandomInt(0, 10)],
  };
};

export const buildTestUnsplashDish = (): UnsplashDish => {
  return {
    dishId: faker.random.uuid(),
    user: {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      htmlUrl: faker.internet.url(),
    },
    urls: {
      raw: faker.internet.url(),
    },
  };
};
