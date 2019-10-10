const {lookUpId, lookUpAddress} = require("./connect_file");
const {dnsLookUpPromise, dnsLookUp} = require("./dns");
const URL = process.argv[2] || "google.com";
// const URL = lookUpId(id);

console.log(`URL: ${URL}`);
// console.log(lookUpAddress("iimpa.br"));
// console.log(lookUpId(1));
// console.log(lookUpId(10));
// console.log(lookUpId(3));

// const addresses = dnsLookUp(URL);
// console.log(addresses);
//insertUrl(URL);

// dnsLookUpPromise(URL)
//   .then(addresses => {
//     addresses.forEach(address => console.log(address));
//   })
//   .catch(() => {
//     console.log("Invalid URL...");
//   });

console.log(lookUpId(10));