import clientPromise       from '@/lib/mongodb';
import { MongoDBAdapter }  from '@next-auth/mongodb-adapter';
import NextAuth            from 'next-auth'
import YandexProvider      from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    //YandexProvider({
    //  clientId:     process.env.YC_EMAIL_ACCESS_KEY,
    //  clientSecret: process.env.YC_EMAIL_SECRET_ACESS_KEY,
    //}),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email:    { label: "Email", type: "text", placeholder: "jsmith"},
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        return user;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
})