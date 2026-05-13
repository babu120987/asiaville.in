pipeline {
    agent any

    environment {
        WSL_HOST = '192.168.1.251'
        PROJECT_DIR = '/home/asiaville/asiaville-bucket'
        IMAGE_NAME = 'asiaville.in'
        CONTAINER_NAME = 'asiaville'
        HOST_PORT = '10000'
    }

    stages {
        stage('Deploy In WSL') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'wsl-password', usernameVariable: 'WSL_USER', passwordVariable: 'WSL_PASS')]) {
                    script {
                        def remote = [
                            name: 'wsl',
                            host: env.WSL_HOST,
                            user: env.WSL_USER,
                            password: env.WSL_PASS,
                            allowAnyHosts: true
                        ]

                        sshCommand remote: remote, command: """
                            set -e
                            cd ${env.PROJECT_DIR}
                            git fetch origin main
                            git reset --hard origin/main
                            docker build -t ${env.IMAGE_NAME}:latest .
                            docker rm -f ${env.CONTAINER_NAME} 2>/dev/null || true
                            docker run -d --name ${env.CONTAINER_NAME} --restart unless-stopped -p ${env.HOST_PORT}:80 ${env.IMAGE_NAME}:latest
                            docker ps --filter name=${env.CONTAINER_NAME}
                        """
                    }
                }
            }
        }
    }
}
