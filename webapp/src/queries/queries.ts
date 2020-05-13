import { gql } from "apollo-boost";

export const GET_DISH = gql`
  query getDish($dishId: ID!) {
    getDish(dishId: $dishId) {
      dishId
      user {
        name
        username
        htmlUrl
      }
      urls {
        raw
      }
    }
  }
`;
