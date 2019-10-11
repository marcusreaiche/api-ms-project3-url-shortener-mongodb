const express = require("express");
const router = express.Router();
// root route
router.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});
// shorturl API
// router.get("/api/shorturl/:id", (req, res) => {
//   // lookup id in table and get address
//   const id = Number(req.params.id);
//   const address = lookUpId(id);
//   // redirect to address
//   if (address) {
//     res.redirect(address);
//   }
//   else {
//     res.json({
//       error: "No shorturl found for given input"
//     });
//   }
// });

// router.post("/api/shorturl/new", async (req, res) => {
//   const { url } = req.body;
//   const data = await asyncInsertUrl(url).catch(err => err);
//   res.json(data);
// });

module.exports = router;