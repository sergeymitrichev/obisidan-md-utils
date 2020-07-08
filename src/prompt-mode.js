const prompts = require('prompts');

module.exports = () => prompts([
  {
    type: 'select',
    name: 'mode',
    message: 'Select mode',
    choices: [ 'Find unrelated', 'Exit programm' ],
    initial: 1
  }
]);


