const Url = require("../models/Url");
const initialData = require("../initial_data");
const handleError = require("../helpers/handleAsyncError");
const { dnsLookUp } = require("../helpers/dns");

module.exports = {
  async index(req, res) {
    const doc = await Url.find()
                        .select(["short_url", "original_url"])
                        .sort({short_url: 1})
                        .catch(handleError);
    if(doc instanceof Error) {
      res.json({Error: doc.message});
    }
    res.json(doc.map(elem => ({
      short_url: elem.short_url,
      original_url: elem.original_url
    })));
  },
  
  async show(req, res, done) {
    const id = Number(req.params.id);
    const doc = await Url.findOne({short_url: id}).catch(handleError);
    if(doc instanceof Error) {
      return done(res.json({Error: doc.message}));
    }
    if (doc) {
      return done(res.redirect(doc.original_url));
    }
    return done(res.json({error: "No shorturl found for given input"}));
  },

  async store(req, res, done) {
    const { url } = req.body;
    // Checks if url starts with "http(s)://"
    if (!/^https?:\/\//.test(url)) return done(res.json({error: "invalid URL"}));
    // DNS look up
    const validUrl = await dnsLookUp(url.replace(/^https?:\/\//, "")).catch(handleError);
    if (!validUrl) return done(res.json({error: "invalid URL"}));
    // URL is valid!
    // Search URL in database
    const doc = await Url.findOne({original_url: url})
                        .select(["original_url", "short_url"])
                        .catch(handleError);
    if (doc instanceof Error) {
      return done(res.json({error: doc.message}));
    }
    // Case when URL is stored in database
    if (doc) {
      const { short_url, original_url } = doc;
      return done(res.json({
        short_url,
        original_url
      }));
    }
    // Inserting URL into database
    else {
      const allDocs = await Url.find();
      const newDoc = new Url({
        short_url: allDocs.length + 1,
        original_url: url
      });
      const data = await newDoc.save().catch(handleError);
      if (data instanceof Error) {
        return done(res.json({error: data.message}));
      }
      return done(res.json({
        short_url: newDoc.short_url,
        original_url: newDoc.original_url
      }));
    }
  }
};