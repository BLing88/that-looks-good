export const typeDefsString = `
    type Query {
        getDish(dishId: ID!): Dish
    }

    type Dish {
        dishId: ID!
        urls: Urls!
        user: User!
    }

    type User {
        name: String!
        username: String!
        htmlUrl: String!
    }

    type Urls {
        raw: String!
    }
`;
