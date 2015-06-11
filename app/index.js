// var generators = require('yeoman-generator');
var fs = require('fs');
var assign = require('object-assign');

var generators = require('yeoman-generator');
var path = require('path');

var helpers = generators.test;

function isFile(filePath) {
  try {
    var stats = fs.lstatSync(filePath);
    return stats.isFile();
  } catch (e) {}

  return false;
}

module.exports = generators.Base.extend({
  writing: function () {
    var packagePath = this.destinationPath('package.json');
    var packageJSON = {};

    if (fs.existsSync(packagePath)) {
      if (!isFile(packagePath)) {
        throw new Error('package.json exists but it is not a file');
      }

      packageJSON = JSON.parse(fs.readFileSync(packagePath));
    }

    var scriptsObject;

    if (packageJSON.scripts && packageJSON.scripts.lint) {
      packageJSON.scripts = assign({}, packageJSON.scripts || {}, {
        lint2: "eslint ./*.js"
      })
    } else {
      packageJSON.scripts = assign({}, packageJSON.scripts || {}, {
        lint: "eslint ./*.js"
      });
    }

    packageJSON.eslintConfig = assign({}, packageJSON.eslintConfig || {}, {
      parser: 'babel-eslint',
      plugins: [
        'private-variables'
      ],
      rules: {
        'no-underscore-dangle': false,
        'private-variables/no-access': [2, 'class-only']
      }
    });

    packageJSON.devDependencies = assign({}, {
      'babel-eslint': "^3.1.14",
      eslint: "^0.22.1"
    }, packageJSON.devDependencies || {});

    fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2));
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});