pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "mca-devops-app"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('app') {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Test') {
            steps {
                // Run tests inside the Docker container
                sh "docker run --rm ${DOCKER_IMAGE} npm test"
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'app/**/*.js', fingerprint: true
            }
        }
    }
}

