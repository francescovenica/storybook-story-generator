const fs = require('fs');
const path = require('path');

const componentsFolder = './../components';
const files = fs.readdirSync(path.resolve(__dirname, componentsFolder));

let imports = '';
let file = 'export default [\n';
files.forEach(_file => {

  imports += `import ${_file} from '${componentsFolder}/${_file}';\n`;

  file += `{`;
  file += `'name':'${_file}',`;
  file += `'path': ${_file}`;
  const dataPath = path.resolve(__dirname, `${componentsFolder}/${_file}/dataStory.js`);
  if (fs.existsSync(dataPath)) {
    file += `,'data': require('${componentsFolder}/${_file}/dataStory.js')`;
  }
  const dataStyle = path.resolve(__dirname, `${componentsFolder}/${_file}/dataStyle.js`);
  if (fs.existsSync(dataStyle)) {
    file += `,'style': require('${componentsFolder}/${_file}/dataStyle.js')`;
  }
  file += '},\n';

  file = file.replace(',},','},');

})
file += ']';
file = file.replace(',]', ']');

const _path = path.resolve(__dirname, 'components.js');
fs.writeFile(_path, imports + file, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
}); 
