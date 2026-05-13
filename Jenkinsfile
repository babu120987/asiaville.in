pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/Applications/Docker.app/Contents/Resources/bin:${env.PATH}"
        IMAGE_NAME = 'asiaville.in'
        CONTAINER_NAME = 'asiaville'
        HOST_PORT = '10001'
    }

    stages {
        stage('Docker Check') {
            steps {
                sh 'which docker && docker version'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} 2>/dev/null || true
                    docker run -d --name ${CONTAINER_NAME} --restart unless-stopped -p ${HOST_PORT}:80 ${IMAGE_NAME}:latest
                '''
            }
        }
    }
}
