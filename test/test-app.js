var helpers = require('yeoman-generator').test;
var path = require('path');
var assert = require('yeoman-generator').assert;
var fs = require('fs');
var expect = require('expect.js');

describe('react-material-ui:page', function () {
  describe('no options', function () {
    var react;
    var appPath = 'myapp';
    var deps = [
      '../../../app'
    ];
    var options = {
      'appPath': appPath,
      'skip-welcome-message': true,
      'skip-install': true,
      'skip-message': true,
      'no-inject': true
    };

    it('should simply create a new package.json file', function (done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './.tmp1'))
        .withOptions(options)
        .on('end', function () {
          assert.fileContent('package.json', JSON.stringify({
            scripts: {
              lint: "eslint ./*.js"
            },
            eslintConfig: {
              parser: 'babel-eslint',
              plugins: [
                'privacy'
              ],
              rules: {
                'no-underscore-dangle': false,
                'privacy/no-access': [2, 'class-only']
              }
            },
            devDependencies: {
              'babel-eslint': "^3.1.14",
              eslint: "^0.22.1"
            }
          }, null, 2));
          done();
        });
    });

    it('should update the currently existing package.json file', function (done) {
      var destPath = path.join(__dirname, './.tmp2');

      helpers
        .run(path.join(__dirname, '../app'))
        .inDir(destPath, function (dir) {
          fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
            scripts: {
              test: 'mocha'
            },
            devDependencies: {
              foo: "^0.1.0"
            }
          }));
        })
        .withOptions(options)
        .on('end', function () {
          var actual = JSON.parse(
            fs.readFileSync(path.join(destPath, 'package.json'))
          );
          var expected = {
              scripts: {
              test: 'mocha',
              lint: 'eslint ./*.js'
            },
            eslintConfig: {
              parser: 'babel-eslint',
              plugins: [
                'privacy'
              ],
              rules: {
                'no-underscore-dangle': false,
                'privacy/no-access': [2, 'class-only']
              }
            },
            devDependencies: {
              foo: '^0.1.0',
              'babel-eslint': '^3.1.14',
              eslint: '^0.22.1'
            }
          };
          expect(actual).to.eql(expected);
          done();
        });
    });
  });
});
