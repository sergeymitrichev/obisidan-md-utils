const fs = require('fs');
const prompts = require('prompts');
const { getZettelkastenId } = require('./utils/date-time')

module.exports = async (files, rootPath) => {
  const unrelated = findUnrelated(files, rootPath);
  const { action } = await promptAction();

  switch (action) {
    case 0: {
      unrelated.forEach(({ name }, i) => console.log(`${i}. ${name}`));
      break;
    }
    case 1: {
      const filenameTemplate = `${rootPath}${getZettelkastenId(new Date())} Unrelated.md`;
      const { filename } = await promptFilename(filenameTemplate);
      const data = '# Unrelated cards \n' + unrelated.map(({ name }) => `* [[${name}]]`).join('\n');
      fs.writeFileSync(filename, data, 'utf-8');
      console.log(`Unrelated cards saved in ${filename}`);
      break;
    }
    default: {
      return;  
    }
  }
  
}

const findUnrelated = (files, rootPath) => {
  return files
    .map(name => ({
      name,
      data: fs.readFileSync(`${rootPath}${name}`, 'utf8')
    }))
    .filter(({ data }) => data.search(/\[\[.*\]\]/gm) < 0);
}

const promptAction = () => prompts([
  {
    type: 'select',
    name: 'action',
    message: 'What to do with founded unrelated cards?',
    choices: [ 'Show', 'Save in MD file' ],
    initial: 1
  }
])

const promptFilename = (filename) => prompts([
  {
    type: 'text',
    name: 'filename',
    message: 'Enter filename',
    initial: filename
  }
])
