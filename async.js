const fs = require("fs");
const fetch = require("node-fetch");
const filepath = process.argv[2] || "./db/addresses.csv";
const options = {
  encoding: "utf-8"
};
const id = process.argv[2] || 1;

const lookUpId = id => {
  const idx = Number(id);
  return new Promise((resolve, reject) => {
    fs.readFile("./db/addresses.csv", options, (err, data) => {
      if (err) {
        console.log(err.message);
        reject();
      }
      else {
        const rows = data.split("\n");
        if (rows.length < idx) {
          resolve("");
        }
        else {
          resolve(rows[idx - 1].split(",")[1]);
        }      
      }
    });  
  });
}

async function test() {
  const res = await fetch("https://google.com");
  const data = await res.text();
  console.log(data);
}

test();

lookUpId(id).then(data => console.log(data));
module.exports = {lookUpId};