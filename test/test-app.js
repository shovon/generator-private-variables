// var helpers = require('yeoman-generator').test;
// var path = require('path');

// var appPath = 'myapp';
// var deps = [
//   path.join(__dirname, '..', 'app')
// ];
// var options = {
//   appPath: appPath,
//   'skip-welcome-message': true,
//   'skip-message': true
// };

// describe('generator-private-variables', function () {
//   describe('blank slate', function () {

//     beforeEach(function () {
//       var testDirectory = path.join(__dirname, '.tmp', appPath);
//       helpers
//         .testDirectory(testDirectory, function (err) {
//           if (err) { return done(err); }
//           done();
//         });
//     });

//     it('should should create a package.json file, as well as install `eslint-plugin-private-variables', function (done) {
//       var generator =
//         (path.basename(path.dirname(__dirname))).slice('generator-'.length);

//       var privateVariables = helpers
//         .createGenerator(
//           generator, deps, [], options
//         );

//       console.log(privateVariables);
//       helpers.mockPrompt(privateVariables, {});

//       privateVariables.run({}, function () {
//         helpers.assertFile(['package.json']);
//         helpers.assertFileContent(
//           'package.json',
//           JSON.stringify({
//             scripts: {
//               lint: 'eslint ./*.js'
//             },
//             eslintConfig: {
//               parser: 'babel-eslint',
//               env: {
//                 node: true
//               },
//               plugins: [
//                 'private-variables'
//               ],
//               rules: {
//                 'no-underscore-dangle': false,
//                 'privacy/no-access': [2, 'class-only']
//               }
//             },
//             devDependencies: {
//               'babel-eslint': '^3.1.14',
//               eslint: '^0.22.1'
//             }
//           }, null, 2)
//         );
//       });
//     });
//   });
// });

// var helpers = require('yeoman-generator').test;
// var path = require('path');

// describe('react-material-ui:page', function () {
//   describe('no options', function () {
//     var react;
//     var appPath = 'myapp';
//     var deps = [
//       '../../../app'
//     ];
//     var options = {
//       'appPath': appPath,
//       'skip-welcome-message': true,
//       'skip-install': true,
//       'skip-message': true,
//       'no-inject': true
//     };

//     beforeEach(function (done) {
//       console.log('In before each');
//       helpers
//         .testDirectory(path.join(__dirname, '.tmp', appPath), function (err) {
//           console.log('Done before each');
//           if (err) { return done(err); }
//           done();
//         });
//     });

//     it('should simply generate a new page', function (done) {
//       var generator =
//         (path.basename(path.dirname(__dirname)) + ':page')
//           .slice('generator-'.length);

//       console.log(options);

//       react = helpers
//         .createGenerator(
//           generator, deps, [], options
//         );

//       // helpers.mockPrompt(react, {});

//       react.run({}, function () {
//         console.log('Done running');
//         done();
//       });
//     });
//   });
// });

var helpers = require('yeoman-generator').test;
var path = require('path');
var assert = require('yeoman-generator').assert;

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

    // beforeEach(function (done) {

    // });

    it('should simply generate a new page', function (done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withOptions(options)
        .on('ready', function () {
          
        })
        .on('end', function () {
          assert.fileContent('package.json', JSON.stringify({
            scripts: {
              lint: "eslint ./*.js"
            },
            eslintConfig: {
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
            },
            devDependencies: {
              'babel-eslint': "^3.1.14",
              eslint: "^0.22.1"
            }
          }, null, 2));
          done();
        });
    });
  });
});