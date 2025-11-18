import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setDataResidency('eu');
// // uncomment the above line if you are sending mail using a regional EU subuser

export const sendResetPassword = async (to, name, link) => {
  const msg = {
    to: to, // Change to your recipient
    from: 'odunlamibamidelejohn@gmail.com', // Change to your verified sender
    templateId: 'd-8fed36c89f3c4fdbb5d107a90aebf81a',
    dynamic_template_data: {
      name: name,
      url: link,
    },
  };

  try {
    const send = await sgMail.send(msg);
    console.log(send);
  } catch (e) {
    console.log(e);
  }
};
