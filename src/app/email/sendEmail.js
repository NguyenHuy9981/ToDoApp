const domain = 'hsandbox7ca2f04f35314c90bc7d3980052a47b6.mailgun.org';
const apiKey = 'a6d79517b1e868dd2d7bee2365972c28-52d193a0-72a5e0df';
const mailgun = require('mailgun-js')({
  domain,
  apiKey,
});

class Mail {
  sendMail(
    senderEmail,
    receiverEmail,
    emailSubject,
    emailBody,
  ) {
    const data = {
      from: senderEmail,
      to: receiverEmail,
      subject: emailSubject,
      text: emailBody,
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) console.log(error);
      else console.log(body);
    });
  }
}

module.exports = new Mail();
