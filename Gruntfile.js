var grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-ssh-deploy');
grunt.loadNpmTasks('grunt-ssh');

module.exports = function(grunt) {
    grunt.initConfig({
        //load secret file with Cert Passphrase page.
        secret: grunt.file.readJSON('Certs/secret.json'),

        // Empties folders to start fresh
        clean: {
            distStart: ["dist", "distzip"],
            distPrep: ['dist/**/*.DS_Store'],
        },
        // Copies files to the distribution folder for deployment.
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['public/**', 'server/**', 'dbConfig.js', 'server.js', 'package.json' ],
                        dest: 'dist/',
                    },
                ],
            },
        },
        // Compress (.zip) the dist folder into distzip folder.
        compress: {
            main: {
                options: {
                    archive: 'distzip/migration.zip'
                },
                files: [
                    {
                        cwd: 'dist/',
                        src: ['**'],
                        // dest: 'distzip'
                    }
                ]
            }
        },

        // do not store credentials in the git repo, store them separately and read from a secret file
        //secret: grunt.file.readJSON('secret.json'), FOR SSH DEPLOY
        environments: {
            options: {
                local_path: 'distzip/migration.zip',
                current_symlink: 'current',
                deploy_path: '/home/ec2-user/GruntSSHDeployTest'
            },
            dev: {
                options: {
                    host: '52.26.33.116',
                    username: 'ec2-user',
                    //password: '',
                    privateKey: grunt.file.read('Certs/JonathanAWS.ssh'),
                    passphrase: '<%= secret.CertPassphrase %>',
                    port: '22',
                    debug: true,
                    releases_to_keep: '3',
                    before_deploy: 'cd /home/ec2-user/GruntSSHDeployTest/current ' +
                    '&& forever stopall',
                    after_deploy: 'cd /home/ec2-user/GruntSSHDeployTest/current ' +
                    '&& unzip migration.zip && rm migration.zip ' +
                    '&& npm install --production ' +
                    '&& forever start server'

                }
            }
        },
        sshconfig: { //FOR GRUNT SSH
            dev: {
              host: '52.26.33.116',
              username: 'ec2-user',
              //password: '',
              privateKey: grunt.file.read('Certs/JonathanAWS.ssh'),
              passphrase: '<%= secret.CertPassphrase %>',
              port: '22',
              path: '/home/ec2-user/GruntSSHDeployTest/current'
            }
        },
        sshexec: { //FOR GRUNT SSH
            pwd: {
              command: 'pwd',
            },
            foreverStop: {
              command: "cd /home/ec2-user/GruntSSHDeployTest/current && forever stopall",
            },
            foreverStart: {
              command: "cd /home/ec2-user/GruntSSHDeployTest/current && forever start server",
            },
        }
    });

    grunt.option('config','dev');

    grunt.registerTask('build', ['clean:distStart',
    'copy:main', 'clean:distPrep', 'compress:main']);

    grunt.registerTask('deploy', ['build', 'ssh_deploy:dev']);

    grunt.registerTask('rollback', [ 'sshexec:foreverStop', 'ssh_rollback:dev', 'sshexec:foreverStart']);
}
