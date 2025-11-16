import { MailtrapClient } from 'mailtrap';
const TOKEN = process.env.MAILTRAP_API;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.MAILTRAP_SENDER,
  name: 'Mailtrap Test',
};



