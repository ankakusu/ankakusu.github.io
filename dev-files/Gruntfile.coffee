module.exports = (grunt)->

  grunt.initConfig
    pkg         : grunt.file.readJSON "package.json"

    coffee      :
      all:
        files: [{
          expand: true
          cwd: 'coffee'
          src: '**/*.coffee'
          dest: '../content/scripts'
          ext: '.js'
        }]
        options:
          bare: true
          spawn: false

    compass     : #Task
      dist      : # Target
        options: # Target options
          outputStyle: "expanded"
          sassDir: 'sass'
          cssDir: '../content/css'
          environment: 'production'
          imagesDir: "images"
          generatedImagesDir: "../content/img/sprites/"
          httpGeneratedImagesPath: "/img/sprites/"
      dev: # Another target
        options:
          sassDir: 'sass'
          cssDir: 'css'
    jade: 
      debug: 
        options: 
          pretty: true
          data: 
            debug: true
        files: [{
            expand: true,
            cwd: 'jade/partials',
            src: '**/*.jade' ,
            dest: '../content/partials',
            ext: '.html'
          },
          "../layouts/default.html": "jade/default.jade",
          "../layouts/post.html": "jade/post.jade"
        ]
          
          #"../content/partials/home.html": "jade/partials/home.jade"
      release: 
        options: 
          data: 
            debug: false
        files: 
          "release.html": "test.jade"

    copy:
      main:
        src: ['bower_components/**/*.min.js', 'bower_components/underscore/underscore.js']
        dest: '../content/lib/'
        expand: true
        flatten: true
        filter: 'isFile'
      
    watch       :
      compass   : 
        options : atBegin: yes
        files   : ['**/*.{scss,sass}']
        tasks   : ['compass:dist']
      coffee    :
        options : atBegin: yes
        files   : ['coffee/*.coffee']
        tasks   : ['coffee']
      jade      :
        options : atBegin: yes
        files   : ['jade/**/*.jade', 'jade/*.jade']
        tasks   : ['jade']


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  
  grunt.registerTask 'default', ['compass', 'watch']
  grunt.registerTask 'build', ['copy']


