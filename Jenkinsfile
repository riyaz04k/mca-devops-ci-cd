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

        stage('Save Docker Image') {
            steps {
                dir('app') {
                    // Save Docker image tarball into ansible/playbooks/files so Ansible can access it
                    sh "docker save -o ../ansible/playbooks/files/${DOCKER_IMAGE}.tar ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'app/**/*.js', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                dir('ansible') {
                    // Deploy the Docker image to the app server
                    sh 'ansible-playbook -i inventories/production playbooks/deploy.yml'
                }
            }
        }
    }
}

