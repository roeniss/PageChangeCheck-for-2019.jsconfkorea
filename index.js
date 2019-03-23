const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const mailToMe = require("./mailToMe");

const url = "https://2019.jsconfkorea.com/";

// status:0 --> 메일 필요(변화 존재)
// status:1 --> 메일 필요없음(변화 없음)
// err      --> 메일 필요(오류 발생)

async function mainFunc() {
  let res = await reqFunc();

  const content = res.payload;
  const status = res.status;

  if (status === 0) {
    var $ = cheerio.load(content, { decodeEntities: false });
    const newText = $("div.section-container.section-index").text();
    let res = await checkChange(newText);
    if (res.status === 0) {
      console.log("[INFO] Something changed");
      updateChange(newText);
      mailToMe(newText);
    } else {
      console.log("[INFO] Nothing changed");
    }
  }
}

const reqFunc = () => {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body) {
      if (error) return reject(error);
      if (response.statusCode === 200) {
        return resolve({ status: 0, payload: body });
      } else {
        return resolve({ status: 1, payload: response });
      }
    });
  }).catch(catchFunc);
};

const checkChange = newText => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/note.txt", "utf-8", function read(err, data) {
      if (err) return reject(err);
      if (data === newText) return resolve({ status: 1 });
      return resolve({ status: 0 });
    });
  }).catch(catchFunc);
};

const updateChange = newText => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + "/note.txt", newText, function(err) {
      if (err) return reject(err);
      return resolve({ status: 0 });
    });
  }).catch(catchFunc);
};

const catchFunc = e => {
  mailToMe(e);
};

mainFunc();

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at:", p, "reason:", reason);
});
