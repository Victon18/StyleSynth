import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text", placeholder: "John Doe" },
                email: { label: "Email", type: "email", placeholder: "your@email.com" },
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
                if (!credentials?.phone || !credentials?.password) {
                    return null;
                }

                // Check if user exists by phone number
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email || existingUser.number
                        }
                    }
                    return null;
                }

                if (!credentials?.name || !credentials?.email) {
                    return null;
                }

                try {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    const user = await db.user.create({
                        data: {
                            name: credentials.name,
                            email: credentials.email,
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch(e) {
                    console.error(e);
                }

                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        },
        async signIn({ user, account, profile }: any) {
            if (account?.provider === "google") {
                try {
                    const existingUser = await db.user.findFirst({
                        where: {
                            email: user.email
                        }
                    });

                    if (!existingUser) {
                        await db.user.create({
                            data: {
                                email: user.email,
                                name: user.name,
                                number: user.email,
                                password: ""
                            }
                        });
                    }
                } catch (e) {
                    console.error("Error creating OAuth user:", e);
                    return false;
                }
            }
            return true;
        }
    }
}
