var email = require("emailjs/email");
require("dotenv").config();

module.exports = newText => {
  return new Promise((resolve, reject) => {
    var server = email.server.connect({
      user: process.env.GID,
      password: process.env.GPW,
      host: "smtp.gmail.com",
      ssl: true
    });

    server.send(
      {
        to: process.env.TO,
        from: process.env.FROM,
        subject: "🚨🚨🚨JSconf 홈페이지 변화감지!🚨🚨🚨",
        text: "즉시확인요망🚨🚨🚨https://2019.jsconfkorea.com/" + "\n\n" + newText
      },
      function(err, message) {
        if (err) return reject(err);
        console.log("[INFO] Email sended");
        return resolve(message);
      }
    );
  }).catch(e => console.log(e));
};
