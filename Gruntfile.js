module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        http: {
            themeisle_sitemaps_service: {
                options: {
                    url: 'http://104.236.125.82/slack-commands/themeisle-wraith-service.php',
                    method: 'POST',
                    callback: function(error, response, body) {
                        if(error != null) {
                            grunt.log.error(error)
                        }
                        grunt.log.write(body)
                    },
                    form: {
                        mode: 'sitemaps'
                    }
                },
                dest: 'sitemaps.log'
            },
            themeisle_crawl_service: {
                options: {
                    //url: 'http://104.236.125.82/slack-commands/themeisle-wraith-service.php',
                    url: 'http://localhost/slack-bot/slack-commands/themeisle-wraith-service.php',
                    method: 'POST',
                    callback: function(error, response, body) {
                        if(error != null) {
                            grunt.log.error(error)
                        }
                        grunt.log.write(body)
                    },
                    form: {
                        mode: 'crawl',
                        slug: '<%= pkg.wraithSlug %>'
                    }
                },
                dest: 'crawl.log'
            }
        }
    })

    grunt.loadNpmTasks('grunt-http');

    grunt.registerTask('default', ['http:themeisle_crawl_service']);
    grunt.registerTask('sitemaps', ['http:themeisle_sitemaps_service']);
    grunt.registerTask('crawl', ['http:themeisle_crawl_service']);
}