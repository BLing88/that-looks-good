const testResponse = {
  data: {
    getDish: {
      dishId: "3DZTercmEF4",
      user: {
        name: "Alana Harris",
        username: "alanaharris",
        htmlUrl: "https://unsplash.com/@alanaharris",
      },
      urls: {
        raw:
          "https://images.unsplash.com/photo-1564869733874-7c154d5de210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzMzk0MH0",
      },
    },
  },
};

export const getDish = async (_: any, { dishId }: { dishId: string }) => {
  return {
    dishId: "3DZTercmEF4",
    user: {
      name: "Alana Harris",
      username: "alanaharris",
      htmlUrl: "https://unsplash.com/@alanaharris",
    },
    urls: {
      raw:
        "https://images.unsplash.com/photo-1564869733874-7c154d5de210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzMzk0MH0",
    },
  };
};
