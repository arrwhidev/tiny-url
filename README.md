# Tiny Url

A wonderfully simple url shortener.

Converts base10 -> base62 for the shortening algorithm (https://github.com/arrwhidev/convert-bases).

## Usage

 * `yarn install`
 * `yarn run start`
 * `curl -H "Content-Type: application/json" -X POST -d '{"url":"http://www.google.com"}' http://localhost:3000/`
 * Visit short url in browser for redirect to google!
