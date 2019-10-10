const dotenv = require("dotenv").config();
const exec = require("child_process").exec;

function countLinesPromise(filepath) {
  return new Promise((resolve, reject) => {
    exec(`wc -l ${filepath}`, function (error, results) {
      if(error) {
        reject(-1);
      }
      resolve(Number(results.match(/^\d*/)[0]));
    });
  });
}

async function countLines(filepath) {
  const lines = await countLinesPromise(filepath).catch(e => e);
  return lines;
}

module.exports = {
  countLines
};