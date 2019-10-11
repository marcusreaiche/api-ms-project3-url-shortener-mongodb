// Node modules
const fs = require("fs");
const dotenv = require("dotenv").config();
const os = require("os");
// Custom modules and functions
const { dnsLookUpPromise } = require("./dns");
const { countLines } = require("./wc");
// Set the filepath
const filepath = process.argv[2] || process.env.DB_PATH;
// read file options
const options = {
  encoding: "utf-8"
};

const lookUpId = id => {
  const idx = Number(id);
  const data = fs.readFileSync(filepath, options);
  const rows = data.split(/\n?\r/);
  if (rows.length <= idx) {
    return "";
  }
  else {
    return rows[idx - 1].split(",")[1];
  }
};

const lookUpAddress = address => {
  const data = fs.readFileSync(filepath, options);
  const rows = data.split(/\r?\n/);
  return (
    rows
      .slice(0, rows.length - 1)
      .map(row => {
        const [short_url, original_url] = row.split(",");
        return {
          short_url: Number(short_url),
          original_url
        };
      })
      .filter(row => row.original_url === address)
  );
};


const asyncInsertUrl = async url => {
  const invalidUrlMessage = { error: "invalid URL" };
  // Check if passed url begins with http(s)://
  if (!/^https?:\/\//.test(url)) {
    return invalidUrlMessage;
  }
  // Check if passed URL is valid using DNS lookup
  const addresses = await dnsLookUpPromise(url.replace(/^https?:\/\//, "")).catch(e => {
    return null;  
  });
  if (!addresses) {
    return invalidUrlMessage;
  }  
  // Check if address exists in the table
  const addressSearch = lookUpAddress(url);
  console.log(addressSearch);
  if (addressSearch.length > 0) {
    console.log("There is nothing to be inserted");
    return addressSearch[0];
  }
  else {
    console.log(`We should insert the ${url} into the table`);
    // Get number of lines of files
    const short_url = await countLines(filepath) + 1;
    console.log(`${short_url},${url}`);
    // Append data to file
    fs.appendFileSync(filepath, `${short_url},${url}${os.EOL}`);
    return {
      short_url,
      original_url: url
    };
  }
};


const insertUrl = url => {
  // Check if passed url is valid
  return dnsLookUpPromise(url)
    .then(() => {
      const addressSearch = lookUpAddress(url);
      if (addressSearch.length > 0) {
        console.log("There is nothing to be inserted");
        return addressSearch[0];
      }
      else {
        console.log(`We should insert the ${url} in the table`);
        return `Insert ${url} in table`;
      }
    })
    .catch(() => {
      console.log("Invalid URL");
      return null;
    }); 
};

// Tests
console.log("Running tests inside connect_file.js");
console.log(filepath);
console.log(lookUpId(2));
console.log(lookUpAddress("https://glitch.com"));


module.exports = {
  lookUpId,
  lookUpAddress,
  asyncInsertUrl
};