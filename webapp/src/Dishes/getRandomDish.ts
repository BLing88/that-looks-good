import {
  ChineseDishes,
  KoreanDishes,
  JapaneseDishes,
  IndianDishes,
  ItalianDishes,
  MiscDishes,
  MexicanDishes,
  SoutheastAsianDishes,
  VegetarianDishes,
  Pizza,
} from "./Dishes";

import { DatabaseDish, Category } from "../utility/Dish";

function cumulativeSums(a: number[]): number[] {
  return a.reduce(
    (result: number[], current: number) => [
      ...result,
      result[result.length - 1] + current,
    ],
    [0]
  );
}

function getDistributionIntervals(sums: number[]): [number, number][] {
  const intervals = [];
  for (let i = 1; i < sums.length; i++) {
    intervals.push([sums[i - 1], sums[i]] as [number, number]);
  }
  return intervals;
}

function getRandomCategory(probDist: number[]): Category {
  const intervals = getDistributionIntervals(cumulativeSums(probDist));
  const random = Math.random();
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] <= random && random < intervals[i][1]) {
      return i;
    }
  }
  return 0;
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomDishFrom(source: DatabaseDish[]): DatabaseDish {
  return source[getRandomInt(0, source.length)];
}

function getRandomDish(probDist: number[]): DatabaseDish {
  const randomCategory = Category[getRandomCategory(probDist)];
  switch (randomCategory) {
    case "Chinese":
      return getRandomDishFrom(ChineseDishes);
    case "Korean":
      return getRandomDishFrom(KoreanDishes);
    case "Japanese":
      return getRandomDishFrom(JapaneseDishes);
    case "Italian":
      return getRandomDishFrom(ItalianDishes);
    case "Southeast asian":
      return getRandomDishFrom(SoutheastAsianDishes);
    case "Mexican":
      return getRandomDishFrom(MexicanDishes);
    case "Pizza":
      return getRandomDishFrom(Pizza);
    case "Indian":
      return getRandomDishFrom(IndianDishes);
    case "Vegetarian":
      return getRandomDishFrom(VegetarianDishes);
    case "Misc":
      return getRandomDishFrom(MiscDishes);
    default:
      return getRandomDishFrom(ChineseDishes);
  }
}

export { getRandomDish };
