import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "email" },
        phone: { label: "Phone number", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const passwordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password ?? ""
          );

          if (passwordValid) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email ?? existingUser.number,
            };
          }

          return null;
        }

        // Register new user
        if (!credentials?.name || !credentials?.email) return null;

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const user = await db.user.create({
          data: {
            name: credentials.name,
            email: credentials.email,
            number: credentials.phone,
            password: hashedPassword,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      // attach user.id on login
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // put correct DB user ID into the session
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await db.user.findFirst({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              number: user.email!, // using email as fallback contact
              password: "",
            },
          });
        }
      }
      return true;
    },
  },
};

