import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials),
        })

        const user = await res.json()
        if (!res.ok) return null

        const user_ = {
          id: String(user.id),
          email: user.login,
          name: user.login,
          token: user.token,
          roles: user.roles,
        }
        // console.log(user_) 
        return user_
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith('/') ? `${baseUrl}${url}` : url
    }
  },

  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }