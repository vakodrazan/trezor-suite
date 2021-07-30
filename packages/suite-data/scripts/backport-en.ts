const fs = require('fs');
const path = require('path');

const messages = require('../../suite/src/support/messages').default;

const targetPath = path.join(__dirname, '../../suite/src/support/rawMessages.ts');
const sourcePath = path.join(__dirname, '../../suite-data/files/translations/en.json');

const source: { [key: string]: string } = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

Object.entries(source).forEach(([key, value]) => {
    if (!messages[key]) {
        return;
    }
    messages[key].defaultMessage = value;
})


fs.writeFileSync(targetPath, `const messages = ` + JSON.stringify(messages, null, 2).replace(/"([^"]+)":/g, '$1:') + '\n export default messages');