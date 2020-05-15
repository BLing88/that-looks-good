import { isTokenValid } from "./validate";
import { APIGatewayProxyEvent } from "aws-lambda";

export interface ServerContext {
  event: APIGatewayProxyEvent;
  accessToken: string;
}

export const getAuthorization = async (context: ServerContext) => {
  const { accessToken } = context;
  const { decoded, error } = (await isTokenValid(accessToken)) as any;
  let isAuthorized;
  if (error) {
    isAuthorized = false;
    return { isAuthorized };
  }
  const expDate = new Date(decoded.exp * 1000);
  if (
    expDate < new Date() ||
    decoded.iss !== `https://${process.env.AUTH0_DOMAIN}/` ||
    !decoded.aud.includes(process.env.API_IDENTIFIER)
  ) {
    isAuthorized = false;
  } else {
    isAuthorized = true;
  }
  return { isAuthorized };
};
