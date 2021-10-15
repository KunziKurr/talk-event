const nodemailer = require('nodemailer');

module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marcosvictos@gmail.com',
      pass: 'issenmpduvmjsidn',
    },
  });

  const mailOptions = {
    from: 'marcosvictos@gmail.com',
    to: 'marcosvictos@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
