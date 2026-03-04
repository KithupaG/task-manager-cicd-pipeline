pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'docker build -t kithupag/client:${BUILD_NUMBER} .'
                    sh 'docker build -t kithupag/client:latest .'
                }
            }
        }
        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'docker build -t kithupag/server:${BUILD_NUMBER} .'
                    sh 'docker build -t kithupag/server:latest .'
                }
            }
        }
        stage('Push Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo ${DOCKER_PWD} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh 'docker push kithupag/client:${BUILD_NUMBER}'
                        sh 'docker push kithupag/client:latest'
                        sh 'docker push kithupag/server:${BUILD_NUMBER}'
                        sh 'docker push kithupag/server:latest'
                    }
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sh "scp docker-compose.yaml ec2-user@13.250.107.250:~/task-manager/docker-compose.yaml"
                sh "ssh ec2-user@13.250.107.250 'cd ~/task-manager && docker compose pull && docker compose up -d && docker compose ps'"
            }
        }
    }
}
