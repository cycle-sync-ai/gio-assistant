# Gio Assistant Frontend

Testing app for Usage of Supabase & OTP using Twilio & Google OAuth

## Features

- Google OAuth
- Slack OAuth
- OTP using Tiwlio
- Supabase as db
  
## Tech Stack

- NextJS 13
- Tailwind CSS
- MDX

## Installation

```bash
git clone git@github.com:cycle-sync-ai/gio-assistant.git
cd gio-assistant
npm install
```

## Environment Variables

```bash
# Update these with your Supabase details from your project settings > API
# https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_REDIRECT_URI=

NEXT_PUBLIC_SLACK_CLIENT_ID=
NEXT_PUBLIC_SLACK_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

TWILIO_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

## Running the Application

```bash
# Development
npm run dev

# Production
npm start
```

# Preferences

https://demo-nextjs-with-supabase.vercel.app/

# Author

[Discord](https://discord.gg/TawJX4ue)
[Email](mailto:worker.opentext@gmail.com)
