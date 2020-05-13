import {
  ChineseDishes,
  KoreanDishes,
  JapaneseDishes,
  IndianDishes,
  ItalianDishes,
  MiscDishes,
  MexicanDishes,
  ThaiDishes,
  VegetarianDishes,
  Pizza,
} from "./Dishes";
enum Category {
  Chinese = 0,
  Mexican,
  Japanese,
  Korean,
  Italian,
  Pizza,
  Thai,
  Indian,
  Vegetarian,
  Misc,
}

interface DatabaseDish {
  name: string;
  category: string;
  id: string;
}

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
    case "Thai":
      return getRandomDishFrom(ThaiDishes);
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

// console.log(getRandomCategory([0.35, 0.15, 0.25, 0.2, 0.05]));

export { getRandomDish };
// let zeros = 0;
// let ones = 0;
// let twos = 0;
// let threes = 0;
// let fours = 0;
// const N = 5000;
// for (let i = 0; i < N; i++) {
//   const random = nonUniformDistribution([0.35, 0.15, 0.25, 0.2, 0.05]);
//   if (random === 0) {
//     zeros++;
//   } else if (random === 1) {
//     ones++;
//   } else if (random === 2) {
//     twos++;
//   } else if (random === 3) {
//     threes++;
//   } else {
//     fours++;
//   }
// }
// console.log("zeros", zeros / N);
// console.log("ones", ones / N);
// console.log("twos", twos / N);
// console.log("threes", threes / N);
// console.log("fours", fours / N);
