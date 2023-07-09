// Auth.ts
import express from 'express';
import { ServerResponse } from 'http';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
const client = jwksRsa({
  cache: false,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});
export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<void> {
  if (securityName === 'auth0') {
    const token = request.headers['authorization'];
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Date());
      }
      function getKey(header: any, callback: any) {
        client.getSigningKey(header.kid, function(err, key: any) {
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      }
      //Because i have pattern Bearer <token>
      const splitToken = token?.split(" ")[1]!;
      jwt.verify(splitToken, getKey, function(err: any, decoded: any) {
        if (err) {
          reject({});
        } else {
/*           if (decoded.aud != process.env.AUTH0_AUDIENCE_USERS) {
            console.log("CAE AQUI 1")
            reject(new Error('JWT error'));
          } */
          if (decoded.iss != `https://${process.env.AUTH0_DOMAIN}/`) {
            console.log("CAE AQUI 2")
            reject(new Date());
          }
          if(scopes && scopes!.length !== 0)
          {
            for (let scope of scopes!) {
              console.log({scope})
              console.log(decoded.scope.includes(scope))
              if (!decoded.scope.includes(scope)) {
                console.log("JWT does not contain required permissions.")
                reject(new Date());
              }
            }
          }
          resolve(decoded);
        }
      });
    });
  }
  return new Promise((resolve, reject) =>  
    reject(() => {"Security type not recognized"}));
}