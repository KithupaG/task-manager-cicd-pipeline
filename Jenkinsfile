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
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                    sh 'docker push kithupag/client:latest'
                    sh 'docker push kithupag/server:latest'
                }
            }
        }
    }
}