const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const { htmlToText } = require('html-to-text');
const juice = require('juice');
const dev = process.env.NODE_ENV !== 'production';
require('dotenv').config({
  path: dev ? '.env.local' : '.env.production.local',
});
const smtp = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `lib/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const text = htmlToText(html);
    const htmlWithStylesInlined = juice(html);

    options.html = htmlWithStylesInlined;
    options.text = text;
  }

  return smtp.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
