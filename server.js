const express = require('express');
const bodyParser = require('body-parser');
const converter = require('convert-bases');
const loki = require('lokijs');

// Server port.
const PORT = 3000;

// Instantiate base converter to convert base10 -> base62.
const shortener = converter();

// Create/connect to a database.
// Using an in memory for this example.
const db = new loki('loki.json');
const urls = db.addCollection('urls');

// Create new express app and add bodyParser for handling POSTS.
const app = express();
app.use(bodyParser.json());

// Endpoint (POST) for getting a short code from a long url.
app.post('/', function (req, res) {
    // Deconstruct `url` from request body.
    const { url } = req.body;

    // Insert url into database, grab auto-incremented id.
    const { $loki: id } = urls.insert({ url });

    // Convert id from base10 -> base62.
    const shortCode = shortener.encode(id);

    // Construct url and return.
    res.send({ shortUrl: `http://localhost:${PORT}/${shortCode}` });
});

// Endpoint (GET) for getting long url from a short code.
app.get('/:code', function (req, res) {
    // Deconstruct `code` from request params.
    const { code } = req.params;

    // Decode base62 -> base10.
    const id = shortener.decode(code);

    // Lookup db record.
    const dbObj = urls.get(id);
    if (dbObj === null) {
        res.sendStatus(404);
    } else {
        // Redirect to original long url.
        res.redirect(301, dbObj.url);
    }
});

// Start server.
app.listen(PORT, function () {
    console.log(`Running on http://localhost:${PORT}`);
});
