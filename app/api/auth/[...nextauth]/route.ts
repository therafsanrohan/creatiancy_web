import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict access to only authorized domains (e.g. creatiancy.com)
      // or specific emails
      if (user.email?.endsWith("@creatiancy.com")) {
        return true;
      }
      return false; // Deny access
    },
  },
  pages: {
    signIn: "/dashboard/login", // Custom secure login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
