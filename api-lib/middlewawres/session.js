import { promisifyStore } from 'next-session/lib/compat';
import nextSession from 'next-session';


// use the session storage as next.js local storage
const getSession = nextSession({
  store: {
    get: (key) => {
      return localStorage.getItem(key);
    },
    set: (key, value) => {
      localStorage.setItem(key, value);
    },
    unset: (key) => {
      localStorage.removeItem(key);
    }
  },
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks
    path: '/',
    sameSite: 'strict'
  },
  touchAfter: 1 * 7 * 24 * 60 * 60 // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  next();
}