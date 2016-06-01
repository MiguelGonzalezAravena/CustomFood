module.exports = function(grunt){
  'use strict';
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  var fs = require('fs')
    , uglify = require('uglify-js')
    , cleancss = require('clean-css')
    , filename = 'all'
    , tmpDir = '.tmp/'
    , publicDir = 'public/'
    , privateDir = 'private/'
    , viewsDir = 'views/'
    , htmlPrivateDir = privateDir + 'html/'
    , assetsPrivateDir = privateDir + 'assets/'
    , jsPublicDir = publicDir + 'js/'
    , cssPublicDir = publicDir + 'css/'
    , assetsPublicDir = publicDir + 'assets/'
    , jsFile = publicDir + filename + '.js'
    , cssFile = publicDir + filename + '.css'
    , privateFiles = require('./files.js')
    , concatJS = privateFiles.js
    , concatCSS = privateFiles.css
    , concatAssets = []
    , keysConcatAssets = {}
  ;

  keysConcatAssets = Object.keys(privateFiles.assets);
  for(var x = 0, len = keysConcatAssets.length; x < len; ++x){
    concatAssets.push({
      expand: true
    , src: keysConcatAssets[x]
    , dest: publicDir + privateFiles.assets[keysConcatAssets[x]]
    , filter: 'isFile'
    , flatten: true
    });
  }

  grunt.initConfig({
    notify: {
      file: {
        options: {
          title: 'file.js'
        , message: 'Grunt reloaded.'
        }
      }
    , imagemin: {
        options: {
          title: 'IMAGES'
        , message: 'Images are ready to be used.'
        }
      }
    , assets: {
        options: {
          title: 'ASSETS'
        , message: 'Assets are ready to be used.'
        }
      }
    , htmlmin: {
        options: {
          title: 'HTML - Minify'
        , message: 'HTML files have been minified successfully.'
        }
      }
    , angularPages: {
        options: {
          title: 'PAGES'
        , message: 'Pages are ready to be used.'
        }
      }
    , fonts: {
        options: {
          title: 'FONTS'
        , message: 'Fonts are ready to be used.'
        }
      }
    , favicons: {
        options: {
          title: 'FAVICON'
        , message: 'Favicons are ready to be used'
        }
      }
    , js: {
        options: {
          title: 'JS - ' + filename + '.js'
        , message: 'The file has been concatenated successfully.'
        }
      }
    , css: {
        options: {
          title: 'CSS - ' + filename + '.css'
        , message: 'The file has been concatenated successfully.'
        }
      }
    , watch: {
        options: {
          title: 'WATCH'
        , message: 'Grunt is watching you.'
        }
      }
    , ready: {
        options: {
          title: 'READY'
        , message: 'All files are ready to be used.'
        }
      }
    }
  , clean: {
      options: {
        force: true
      }
    , tmp: [tmpDir]
    , prod: [tmpDir, jsPublicDir, cssPublicDir]
    , all: [tmpDir, viewsDir, publicDir]
    }
  , imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7
        , progressive: true
        , interlaced: true
        , cache: false
        }
      , files: [{
          expand: true
        , cwd: assetsPrivateDir + 'img/'
        , src: ['**/*.{png,jpg,gif}']
        , dest: assetsPublicDir
        }]
      }
    }
  , htmlmin: {
      private: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        , process: function(content, filepath){
            var js = filepath.replace('.html', '.js')
              , css = filepath.replace('.html', '.css')
              , jsFile, cssFile
            ;
            jsFile = '' +
              '<script type="text/javascript" src="/all.js"></script>'
            ;
            cssFile = '' +
              '<link rel="stylesheet" type="text/css" href="/all.css"></link>'
            ;
            if(fs.existsSync(js)){
              jsFile += '' +
              '<script type="text/javascript">' +
                fs.readFileSync(js).toString() +
              '</script>'
              ;
            }
            if(fs.existsSync(css)){
              cssFile += '' +
              '<style rel="stylesheet" type="text/css">' +
                fs.readFileSync(css).toString() +
              '</style>'
              ;
            }
            return content
              .replace('{{js}}', jsFile)
              .replace('{{css}}', cssFile)
            ;
          }
        }
      , files: [{
          expand: true
        , ext: '.html'
        , cwd: htmlPrivateDir
        , src: ['**/*.html']
        , dest: viewsDir
        }]
      }
    , public: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        , process: function(content, filepath){
            var js = filepath.replace('.html', '.js')
              , css = filepath.replace('.html', '.css')
              , jsFile, cssFile
            ;
            jsFile = '' +
              '<script type="text/javascript" src="/all.js"></script>'
            ;
            cssFile = '' +
              '<link rel="stylesheet" type="text/css" href="/all.css"></link>'
            ;
            if(fs.existsSync(js)){
              jsFile += '' +
              '<script type="text/javascript">' +
                  uglify.minify(fs.readFileSync(js).toString(), {
                    fromString: true
                  }).code +
              '</script>'
              ;
            }
            if(fs.existsSync(css)){
              cssFile += '' +
              '<style rel="stylesheet" type="text/css">' +
                new cleancss().minify(fs.readFileSync(css)).styles +
              '</style>'
              ;
            }
            return content
              .replace('{{js}}', jsFile)
              .replace('{{css}}', cssFile)
            ;
          }
        }
      , files: [{
          expand: true
        , ext: '.html'
        , cwd: htmlPrivateDir
        , src: ['**/*.html']
        , dest: viewsDir
        }]
      }
    }
  , copy: {
      js: {
        files: [{
          expand: true
        , src: privateFiles.js
        , dest: jsPublicDir
        }]
      }
    , css: {
        files: [{
          expand: true
        , src: privateFiles.css
        , dest: cssPublicDir
        }]
      }
    , fonts: {
        files: [{
          expand: true
        , cwd: assetsPrivateDir + 'fonts/'
        , src: ['**/*.{ttf,otf,woff,eot,svg}']
        , dest: assetsPublicDir
        }]
      }
    , files: {
        files: concatAssets
      }
    , angularPages: {
        files: [{
          expand: true
        , cwd: viewsDir
        , src: ['**/*']
        , dest: publicDir + 'pages'
        }]
      }
    , assets: {
        files: [{
          expand: true
        , cwd: assetsPrivateDir
        , src: [
            '**/*'
          , '!img/**'
          , '!fonts/**'
          ]
        , dest: assetsPublicDir
        }]
      }
    , favicons: {
        files: [{
          expand: true
        , cwd: assetsPrivateDir + 'img/'
        , src: ['**/favicon.ico']
        , dest: publicDir
        }]
      }
    }
  , concat: {
      js: {
        options: {
          separator: ';\n'
        }
      , src: concatJS
      , dest: jsFile
      }
    , css: {
        options: {
          separator: ''
        }
      , src: concatCSS
      , dest: cssFile
      }
    }
  , concat_sourcemap: {
      js: {
        options: {
          sourceRoot: 'js'
        , sourceContent: true
        , process: function(content){
            return content.replace(/\/\/#.*/, '');
          }
        }
      , src: concatJS
      , dest: jsFile
      }
    , css: {
        options: {
          sourceRoot: 'css'
        , process: function(content){
            return content.replace(/\/\*#.*/, '');
          }
        }
      , src: concatCSS
      , dest: cssFile
      }
    }
  , uglify: {
      prod: {
        options: {
          report: 'gzip'
        }
      , src: jsFile
      , dest: jsFile
      }
    }
  , cssmin: {
      prod: {
        options: {}
      , src: cssFile
      , dest: cssFile
      }
    }
  , cacheBust: {
      options: {
        encoding: 'utf8'
      , algorithm: 'md5'
      , length: 16
      , baseDir: publicDir
      , deleteOriginals: true
      , ignorePatterns: ['.png', '.jpg', '.gif']
      , assets: ['**/*.js', '**/*.css']
      }
    , assets: {
        files: [{
          expand: true
        , cwd: viewsDir
        , src: ['**/*.html']
        }]
      }
    }
  , watch: {
      file: {
        options: {
          livereload: true
        }
      , files: ['files.js']
      , tasks: [
          'clean:all'
        , 'imagemin'
        , 'htmlmin:private'
        , 'copy'
        , 'concat_sourcemap'
        , 'clean:tmp'
        , 'notify:file'
        ]
      }
    , imagemin: {
        options: {
          livereload: true
        }
      , files: [assetsPrivateDir + '**/*.{png,jpg,gif}']
      , tasks: [
          'newer:imagemin'
        , 'notify:imagemin'
        ]
      }
    , angularPages: {
        options: {
          livereload: true
        }
      , files: [viewsDir + '**/*']
      , tasks: [
          'copy:angularPages'
        , 'notify:angularPages'
        ]
      }
    , htmlmin: {
        options: {
          livereload: true
        }
      , files: [htmlPrivateDir + '**/*']
      , tasks: [
          'htmlmin:private'
        , 'notify:htmlmin'
        ]
      }
    , fonts: {
        options: {
          livereload: true
        }
      , files: [assetsPrivateDir + '**/*.{ttf,otf,woff,eot,svg}']
      , tasks: [
          'newer:copy:fonts'
        , 'notify:fonts'
        ]
      }
    , assets: {
        options: {
          livereload: true
        }
      , files: [assetsPrivateDir + '**/*']
      , tasks: [
          'newer:copy:assets'
        , 'notify:assets'
        ]
      }
    , favicons: {
        options: {
          livereload: true
        }
      , files: [assetsPrivateDir + '**/favicon.ico']
      , tasks: [
          'newer:copy:favicons'
        , 'notify:favicon'
        ]
      }
    , js: {
        options: {
          livereload: true
        }
      , files: privateFiles.js
      , tasks: [
          'newer:copy:js'
        , 'concat_sourcemap:js'
        , 'notify:js'
        ]
      }
    , css: {
        options: {
          livereload: true
        }
      , files: privateFiles.css
      , tasks: [
          'newer:copy:css'
        , 'concat_sourcemap:css'
        , 'notify:css'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'watch'
  ]);
  grunt.registerTask('dev', [
    'clean:all'
  , 'copy:files'
  , 'imagemin'
  , 'htmlmin:private'
  , 'copy'
  , 'concat_sourcemap'
  , 'clean:tmp'
  , 'notify:watch'
  , 'watch'
  ]);
  grunt.registerTask('prod', [
    'clean:all'
  , 'copy:files'
  , 'imagemin'
  , 'htmlmin:public'
  , 'copy'
  , 'concat'
  , 'uglify'
  , 'cssmin'
  , 'cacheBust'
  , 'clean:prod'
  , 'notify:ready'
  ]);
  grunt.registerTask('build', [
    'clean:all'
  , 'copy:files'
  , 'imagemin'
  , 'htmlmin:private'
  , 'copy'
  , 'concat_sourcemap'
  , 'cacheBust'
  , 'clean:tmp'
  ]);
};
