import NextAuth         from 'next-auth'
import GoogleProvider   from 'next-auth/providers/google'
import VkProvider       from "next-auth/providers/vk";

export default NextAuth({
  providers: [
    VkProvider({
        clientId: process.env.VK_CLIENT_ID,
        clientSecret: process.env.VK_CLIENT_SECRET
    })
  ]
})