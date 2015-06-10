// var generators = require('yeoman-generator');
var fs = require('fs');
var assign = require('object-assign');

var generators = require('yeoman-generator');
var path = require('path');

var helpers = generators.test;

module.exports = generators.Base.extend({
  writing: function () {
    var packagePath = this.destinationPath('package.json');
    var packageJSON = {};

    if (fs.existsSync(packagePath)) {
      if (!isFile(filePath)) {
        throw new Error('package.json exists but it is not a file');
      }

      packageJSON = JSON.parse(fs.readFileSync(packagePath));
    }

    var scriptsObject;

    if (packageJSON.scripts && pacakageJSON.scripts.lint) {
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
      env: {
        node: 'true'
      },
      plugins: [
        'privacy'
      ],
      rules: {
        'no-underscore-dangle': false,
        'privacy/no-access': [2, 'class-only']
      }
    });

    packageJSON.devDependencies = assign({}, packageJSON.devDependencies || {}, {
      'babel-eslint': "^3.1.14",
      eslint: "^0.22.1"
    });

    fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2));
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});