import nodemailer from "nodemailer";

const fs = require("fs");
const es6TemplateString = require("es6-template-string");

const Email = require("email-templates");

const transport = (() => {
  if (process.env.APP_SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.APP_SMTP_HOST,
      port: process.env.APP_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.APP_SMTP_USER,
        pass: process.env.APP_SMTP_PASS,
      },
    });
  } else {
    return {
      jsonTransport: true,
    };
  }
})();

export const send = async function ({ to, from, template, locals }) {
  if (!to || !template) {
    return false;
  }

  const email = new Email({
    message: {
      from: from || `no-reply@${process.env.APP_DOMAIN_root_domain}`,
    },
    transport,
    preview: !!process.env.APP_PREVIEW_MAIL,
    views: {
      root: `${__dirname}/../emails`,
      options: {},
    },
    send: !!process.env.APP_SEND_MAIL,
    render: (fn, locals) => {
      if (fs.existsSync(`${__dirname}/../emails/${fn}`)) {
        return es6TemplateString.render(
          fs.readFileSync(`${__dirname}/../emails/${fn}`).toString(),
          locals
        );
      } else {
        return "";
      }
    },
  });

  return email
    .send({
      template,
      message: {
        to: to,
      },
      locals: {
        ...locals,
      },
    })
    .then(console.log)
    .catch(console.error);
};

export default {
  send,
};
