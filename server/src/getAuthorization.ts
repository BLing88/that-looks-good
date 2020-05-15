import { isTokenValid, isDecodedResponse } from "./validate";
import { APIGatewayProxyEvent } from "aws-lambda";

export interface ServerContext {
  event: APIGatewayProxyEvent;
  accessToken: string;
}

export const getAuthorization = async (context: ServerContext) => {
  const { accessToken } = context;
  const res = await isTokenValid(accessToken);
  let isAuthorized: boolean;
  if (!isDecodedResponse(res)) {
    return { isAuthorized: false };
  } else {
    const expDate = new Date(res.decoded.exp * 1000);
    if (
      expDate < new Date() ||
      res.decoded.iss !== `https://${process.env.AUTH0_DOMAIN}/` ||
      !res.decoded.aud.includes(process.env.API_IDENTIFIER)
    ) {
      isAuthorized = false;
    } else {
      isAuthorized = true;
    }
    return { isAuthorized };
  }
};
