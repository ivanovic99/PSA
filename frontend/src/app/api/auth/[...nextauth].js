// 'use client'
// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//    callbacks: {
//       async jwt({ token, account }) {
//          // Persist the OAuth access_token to the token right after signin
//          if (account) {
//             token.accessToken = account.access_token
//          }
//          return token
//       },
//       async session({ session, token, user }) {
//          // Send properties to the client, like an access_token from a provider.
//          session.accessToken = token.accessToken
//          return session
//       }
//    },
//    session: {
//       jwt: true,
//       strategy: 'jwt',
//    }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
