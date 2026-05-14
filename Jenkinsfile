pipeline {
    agent any

    environment {
        WSL_HOST = '192.168.1.251'
        PROJECT_DIR = '/home/asiaville/asiaville-bucket'
        IMAGE_NAME = 'asiaville.in:local'
        KIND_CLUSTER = 'asiaville'
    }

    stages {
        stage('Deploy To Kubernetes In WSL') {
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

                            docker build -t ${env.IMAGE_NAME} .

                            kind load docker-image ${env.IMAGE_NAME} --name ${env.KIND_CLUSTER}

                            kubectl apply -f k8s/asiaville.yaml
                            kubectl rollout restart deployment/asiaville
                            kubectl rollout status deployment/asiaville --timeout=120s

                            kubectl get pods
                            kubectl get svc
                        """
                    }
                }
            }
        }
    }
}
