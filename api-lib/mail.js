// Require the Twilio module
const twilio = require('twilio');

const client = new twilio(
  process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

// Send verification code to email such as gmail, outlook, etc.
export async function sendMail({
  to, 
  body="Your verification code is 123456"
}) {
  try {
    await client.messages.create({
      to: to,
      from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
      body: body
    })
    .then(message => console.log(message.sid));
  } catch (e) {
    throw new Error(`Could not send email: ${e.message}`);
  }
}
