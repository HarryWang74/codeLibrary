module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    app: {
      javascript:        '_javascripts/',
      stylesheet:        '_scss/',
      vendor:            '_vendors/',
      public_javascript: '_site/javascripts/',
      public_stylesheet: '_site/stylesheets/'
    },

    // compile scss to css
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      production: {
        options: {
          compass:     true,
          lineNumbers: false,
          style:       'compressed',
          debugInfo: true,
          precision:    10 // https://github.com/twbs/bootstrap-sass/issues/409
        },

        files: {
          '<%= app.public_stylesheet %>application.css' : '<%= app.stylesheet %>application.scss'
        }
      }
    },

    // debug JS
    jshint: {
      options: {
        jshintrc: true,
        force:    true,
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile'
      },
      javascript: {
        src: ['<%= app.javascript %>**/*.js']
      }
    },

    // concat CSS and JS into one file
    concat: {
      options: {
        separator: ';',
        stripBanners: {
          block : true,
          line  : true
        }
      },
      vendorJS: {
      dest: '<%= app.public_javascript %>vendor.js',
      src: [
          // '<%= app.vendor %>jquery.lazyload/jquery.lazyload.js',
          '<%= app.vendor %>owlcarousel/owl-carousel/owl.carousel.js',
          '<%= app.vendor %>bootstrap/dist/js/bootstrap.js',
          '<%= app.vendor %>jquery.easing/js/jquery.easing.min.js',
          '<%= app.vendor %>jquery.transit/jquery.transit.js',
          '<%= app.vendor %>waypoints/lib/jquery.waypoints.js',
          '<%= app.vendor %>jquery-validation/dist/jquery.validate.min.js',
          '<%= app.vendor %>jquery-validation/dist/additional-methods.min.js'
        ]
      },
      applicationJS: {
        dest: '<%= app.public_javascript %>application.js',
        src: [
          '<%= app.javascript %>**/*.js'
        ]
      },
      vendorCSS: {
        dest: '<%= app.public_stylesheet %>vendor.css',
        src: [
          '<%= app.vendor %>yamm3/yamm/yamm.css',
          '<%= app.vendor %>bootstrap/dist/css/bootstrap.css',
          '<%= app.vendor %>bootstrap/dist/css/bootstrap-theme',
          '<%= app.vendor %>fontawesome/css/font-awesome.css',
          '<%= app.vendor %>owlcarousel/owl-carousel/owl.carousel.css',
          '<%= app.vendor %>owlcarousel/owl-carousel/owl.theme.css',
          '<%= app.vendor %>owlcarousel/owl-carousel/owl.transitions.css'
        ]
      },
    },
    
    //compress CSS
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= app.public_stylesheet %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= app.public_stylesheet %>',
          ext: '.css'
        }]
      }
    },


    // compress JS
    uglify: {
      options: {
        sourceMap: false,
        beautify:  false,
        mangle:    true,
        compress: { }
      },
      dist: {
        files: [{
          expand: true,
          cwd:    '<%= app.public_javascript %>',
          src:    '{,*/}*.js',
          dest:   '<%= app.public_javascript %>'
        }]
      }
    },

    // copy files
    copy: {
      /*
      ie8: {
        expand:  true,
        flatten: true,
        src:     '<%= app.vendor %>ie8/build/ie8.js',
        dest:    '<%= app.public_javascript %>',
        filter:  'isFile'
      },
      respond: {
        expand:  true,
        flatten: true,
        src:     '<%= app.vendor %>respond/dest/respond.min.js',
        dest:    '<%= app.public_javascript %>',
        filter:  'isFile'
      },
      
      jquery:{
        expand:  true,
        flatten: true,
        src:     '<%= app.vendor %>jquery/dist/jquery.min.js',
        dest:    '<%= app.public_javascript %>',
        filter:  'isFile'
      }*/
    },


    watch: {
      options: {
        livereload: true
      },
      // javascripts: {
      //  files: ['<%= app.javascript %>**/*.js'],
      //  tasks: ['concat', 'uglify']
      // },
      stylesheets: {
        files: '<%= app.stylesheet %>**/*.scss',
        tasks: 'sass:production'
      }
    }
  });


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('serve',   ['watch']);
  grunt.registerTask('build', ['concat', 'uglify', 'sass:production', 'cssmin','jshint']);
  grunt.registerTask('lint', ['jshint']);
};