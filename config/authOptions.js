import SlackProvider from "next-auth/providers/slack";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: 'consent',
          scope: "profile email https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.send",
        }
      },
      httpOptions: {
        timeout: 60000,
      }
    }),
    SlackProvider({
      clientId: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET,
      httpOptions: {
        timeout: 60000,
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {

      session["token"] = token;
      
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = account.expires_at;
      }
      return token;
    },
  }
};