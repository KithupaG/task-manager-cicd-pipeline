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
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'docker build -t kithupag/client:latest .'
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'npm install'
                    sh 'docker build -t kithupag/server:latest .'
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo ${DOCKER_PWD} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh 'docker push kithupag/client:latest'
                        sh 'docker push kithupag/server:latest'
                    }
                }
            }
        }
    }
}