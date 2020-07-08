const fs = require('fs');

module.exports = (files) => {
  const unrelated = files
    .map(name => ({
      name,
      data: fs.readFileSync(name, 'utf8')
    }))
    .filter(({ data }) => data.search(/\[\[.*\]\]/gm) >= 0);
  unrelated.forEach(({ name }, i) => console.log(`${i}. ${name}`))
}