import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectDB from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {

      providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),


    CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter your Email ID" },
      password: { label: "Password", type: "password" }
    },
    // NextAuth automatically calls the authorize function when the user submits the form.
    // and it also creates both session and JWT tokens
    // If you want to use JWT then you can set the session strategy to "jwt"
    // If you want to use sessions then you can set the session strategy to "database"
    // If you want to use both then you can set the session strategy to "jwt"
    async authorize(credentials) {
        
        if(!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        // Here you can add your own logic to authenticate the user
        try {
            await ConnectDB();

            const user = await User.findOne({
                email : credentials.email
            })

            if(!user){
                throw new Error("No user found with this Email ID")
            }

            const isCorrectPassword = await bcrypt.compare(credentials.password,user.password)

            if(!isCorrectPassword){
                throw new Error("Invalid Password")
            }

            return {
                id : user._id.toString(),
                email : user.email
            }


        } catch (error) {
            console.error("Auth Error" ,error)
            throw error
            
        }
    }

  })
  ],

  callbacks : {
    // Here, In this object I will overwrite some of the callbacks
    async jwt({token, user}){
        if(user){
            token.id = user.id
        }
        return token
    },

    async session({session, token}){
        if(session.user){
            session.user.id = token.id as string
        }
        return session
    }
  },

  pages : {
    signIn : '/login',
    error : '/login'
  },
  
  session : {
    strategy :'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret : process.env.NEXTAUTH_SECRET

}