pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build') {
      steps {
        dir('app') {
          sh 'docker build -t mca-devops-app .'
        }
      }
    }
    stage('Test') {
      steps {
        sh 'npm test --prefix app'
      }
    }
    stage('Archive') {
      steps {
        sh 'docker save mca-devops-app -o mca-devops-app.tar'
        archiveArtifacts artifacts: 'mca-devops-app.tar', fingerprint: true
      }
    }
  }
}
