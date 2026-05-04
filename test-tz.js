const { worldCountries } = require('./data/worldLive.js') || {};
const fs = require('fs');

const content = fs.readFileSync('./data/worldLive.ts', 'utf8');
const tzs = content.match(/tz:\s*"([^"]+)"/g).map(s => s.split('"')[1]);

let invalid = [];
for (let tz of tzs) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz }).format(new Date());
  } catch (e) {
    invalid.push(tz);
  }
}
console.log("Invalid TZs:", invalid);
