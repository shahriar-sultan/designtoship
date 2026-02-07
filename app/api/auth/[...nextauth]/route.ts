import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Call external BFF API directly
          const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          if (!response.ok) {
            console.error('Auth BFF API failed:', response.status, response.statusText);
            return null;
          }

          const user = await response.json();

          // Validate user data structure - adjust based on actual BFF response format
          if (!user || !user.data?.user?.id || !user.data?.user?.email) {
            console.error('Invalid user data from BFF API:', user);
            return null;
          }

          const userData = user.data.user;

          // Return user object for NextAuth
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name || `${userData.firstName} ${userData.lastName}`,
            role: userData.role || 'user',
          };
        }
        catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export const GET = handler
export const POST = handler