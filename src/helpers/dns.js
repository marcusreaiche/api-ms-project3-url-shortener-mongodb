// Performs dns lookups for validating urls 
const dns = require("dns");
const url = process.argv[2] || "google.com"

const options = {
  all: true
};

function dnsLookUpPromise (url) {
  return new Promise((resolve, reject) => {
    dns.lookup(url, options, (err, addresses) => {
    if (err) {
      console.log(err.message);
      reject(null);
    }
    resolve(addresses);
    });  
  });
}

async function dnsLookUp(url) {
  const addresses = await dnsLookUpPromise(url).catch(err => err);
  return addresses; 
}

module.exports = {
  dnsLookUpPromise,
  dnsLookUp
};