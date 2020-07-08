const fs = require('fs');
const prompts = require('prompts');
const { UNRELATED, EXIT } = require('./src/const/modes');
const unrelated = require('./src/unrelated');
const promptMode = require('./src/prompt-mode');
let [mode] = process.argv.slice(2);

(async () => {
  const { path = './' } = await prompts([
    {
      type: 'text',
      name: 'path',
      message: 'Path with MD files',
      initial: '../journal'
    }
  ]);
  const trailedSlashPath = path.endsWith('/') ? path : `${path}/`;
  const mdFiles = fs.readdirSync(path).filter(file => file.toLowerCase().endsWith('.md')).map(file => `${trailedSlashPath}${file}`);

  (mode >= 0) || ({ mode } = await promptMode());
  
  console.log(`Entering to ${mode} mode`);

  switch(mode) {
    case UNRELATED: {
      unrelated(mdFiles);
      break;
    }
    case EXIT:
    default: {
      return;
    }
  }
  
})();