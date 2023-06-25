// pages/api/auth/[...auth0].js
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({redirectUri : "http://localhost/callback", scope : "openid profile"});