const path = require("path");
const Url = require("../models/Url");
// console.log(initialData);
async function IndexController(req, res) {
  // Checks with the database is already populated
  const url = await Url.findOne();
  if (!url) {
    const initialData = require("../initial_data");
    const doc = await Url.create(initialData);
    doc.forEach(elem => console.log(`${elem.original_url} inserted into database`));
  }
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
}

module.exports = {
  IndexController
};