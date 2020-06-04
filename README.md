# That Looks Good

Check it out at https://that-looks-good.now.sh (username: guestuser, password: guestuserpassword123\$)

![gif of That Looks Good](./that-looks-good.gif)

## Tl;dr

This demo app was written in Typescript and React, with a full GraphQL [AWS Lambda][aws lambda] serverless backend using [Apollo server][apollo-server], and login and authentication handled with [Auth0][auth0]. I deployed the front end with [Vercel] (formerly Zeit) and back end with [Serverless][serverless]. Integration and unit tests are written in [Jest][jest]. The photos are sourced from [Unsplash](https://www.unsplash.com "Unsplash").
Note since this is a demo app, Unsplash's API only allows 50 requests per hour.

## Concept

A fun app to help you decide when you're hungry but can't decide on what to eat. Inspired by Tinder, on your phone you swipe right on dishes that look good, and swipe left on dishes that don't. On desktop, just click the left or right buttons. The app keeps a list of the dishes you've liked in a session which you can then view to help you decide.

## App flow

Upon logging in, the app gets a random photo id, then makes a request to the backend. The backend makes a request to Unsplash's API, requesting information about the photo, and then sends it back to the user. The user can then swipe or click left or right on the photo. Swiping right adds that dish to a list of liked dishes, while swiping left ignores it.

I chose to use Unsplash because their photos are free to use. However, this limited me to the photos that I could find on their site. I had to manually find each photo the app uses, because many of the photos on Unsplash are not well-tagged or tagged at all. As a result, the number of dishes that the app can show is somewhat small, currently around 100 (of course I can add or remove photos at any time). If there's a better source of photos, it could easily be used instead of Unsplash. Note that since the number of dishes is small, especially within some categories, repeats are to be expected on occasion.

There is no real need for user login, other than to authorize server requests and requests to the Unsplash API.

## Note about the photos

The photos are obtained from Unsplash using their dynamically resizable images feature. In particular, photos are all resized to a 2:3 aspect ratio and cropped using imgix&rsquo;s [entropy crop][1] method. This means that sometimes the photos are slightly distorted or off-center compared to the original photos. I decided that this was an acceptable tradeoff to manually cropping and resizing each photo and then storing each one in a database.

As mentioned above, since this is a demo app, Unsplash's API only allows 50 requests per hour.

I chose to store the photo ids on the front end because 1) there aren't that many and 2) to save space on the backend. I could have stored them in a database and then on the backend done the work of randomly choosing and returning a random photo.
Since I'm using AWS Lambda, I want to minimize computing time.

## Note about randomness

The photos are obtained randomly by first choosing randomly from 10 categories:

1. Chinese
2. Japanese
3. Italian
4. Southeast Asian
5. Mexican
6. Vegetarian
7. Korean
8. Miscellaneous
9. Pizza
10. Indian

Each photo falls into one of these categories. The categories are chosen from a probability distribution that is updated every time the user swipes right. The probability distribution is computed by simply counting the number of likes each category has chosen (the counts are stored in local storage). Until the hundredth likes is made, a uniform distribution is chosen.

This updating of probabilities is essentially a very simplistic way of "learning" a user&rsquo;s preferences. A different method or algorithm for learning user preferences can be used by simply reimplementing getRandomDish.

After a category has been chosen, a dish is selected with equal likelihood within that category and returned to the user.

## Note on testing

I had some difficulty testing the front end, because of the randomness in getting photos each time. Mocking out getRandomDish is a hassle because it is called every time the AuthenticatedApp is rendered.

## Things to consider for a production app

- find a better source of images
- better way of learning user preferences
- make as a PWA?

[1]: https://docs.imgix.com/apis/url/size/crop#entropy "Entropy crop"
[aws lambda]: https://aws.amazon.com/lambda/
[apollo-server]: https://www.apollographql.com/docs/apollo-server/
[auth0]: https://auth0.com/
[serverless]: https://www.serverless.com/
[vercel]: https://vercel.com/
[jest]: https://jestjs.io/
