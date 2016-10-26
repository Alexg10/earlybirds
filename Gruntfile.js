module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{ // C'est ici que l'on définit le dossier que l'on souhaite importer
          "expand": true,
          "cwd": "assets/scss/", 			//Dossier source
          "src": ["*.scss"],		//Tout fichiers du dossier
          "dest": "",						//Dossier de destination
          "ext": ".css"					//Fichier de destination
        }]
      }
    },
    concat: {
      options: {
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      dist: {
        src: ['js/*.js'], // la source
        dest: 'dist/js/script.js' // la destination finale
      }
    },
    uglify: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'dist/js/script.js'
      }
    },
    watch: {
      scripts: {
        files: '**/*.js', // tous les fichiers JavaScript de n'importe quel dossier
        tasks: ['concat:dist']
      },
      styles: {
        files: '**/*.scss', // tous les fichiers Sass de n'importe quel dossier
        tasks: ['sass:dist']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['sass:dist', 'watch'])
  grunt.registerTask('dev', ['sass:dist', 'concat:dist'])
  grunt.registerTask('dist', ['sass:dist', 'uglify:dist'])
}