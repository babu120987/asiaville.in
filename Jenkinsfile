pipeline {
    agent any

    environment {
        WSL_HOST = 'WINDOWS_OR_WSL_IP'
        WSL_USER = 'asiaville'
        PROJECT_DIR = '/home/asiaville/asiaville-bucket'
        IMAGE_NAME = 'asiaville.in'
        CONTAINER_NAME = 'asiaville'
        HOST_PORT = '10000'
    }

    stages {
        stage('Deploy In WSL') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'wsl-password', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
                    sh '''
                        sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no ${SSH_USER}@${WSL_HOST} "
                            cd ${PROJECT_DIR} &&
                            git pull origin main &&
                            docker build -t ${IMAGE_NAME}:latest . &&
                            docker rm -f ${CONTAINER_NAME} 2>/dev/null || true &&
                            docker run -d --name ${CONTAINER_NAME} --restart unless-stopped -p ${HOST_PORT}:80 ${IMAGE_NAME}:latest
                        "
                    '''
                }
            }
        }
    }
}
