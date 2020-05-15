import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey =
      (key as jwksClient.CertSigningKey).publicKey ||
      (key as jwksClient.RsaSigningKey).rsaPublicKey;
    callback(null, signingKey);
  });
};

interface DecodedResponse {
  decoded: {
    exp: number;
    iss: string;
    aud: string[];
  };
}

interface ErrorResponse {
  error: jwt.VerifyErrors | string;
}

type IsTokenValidResponse = DecodedResponse | ErrorResponse;

export const isDecodedResponse = (
  res: IsTokenValidResponse
): res is DecodedResponse => {
  return (res as DecodedResponse).decoded !== undefined;
};

export const isTokenValid = async (
  token: string
): Promise<IsTokenValidResponse> => {
  if (token) {
    const bearerToken = token.split(" ");

    const result = new Promise<IsTokenValidResponse>((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ["RS256"],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded } as DecodedResponse);
          }
        }
      );
    });
    return result;
  }
  return { error: "No token provided" };
};
