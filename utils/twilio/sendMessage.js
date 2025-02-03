"use server"
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 2
const client = require('twilio')(accountSid, authToken);

export const sendMessage = (message, to) => {

  // const formattedPhoneNumber = formatPhoneNumber(to);

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    })
    .then(message => console.log("Send message successfully!", message.sid))
    .catch(error => console.error("Error send message using twilio", error));
}

const formatPhoneNumber = (phoneNumber) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'US'); // Change 'US' to the appropriate country code

  if (parsedPhoneNumber) {
    return parsedPhoneNumber.formatInternational();
  }

  return null;
};