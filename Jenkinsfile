pipeline {
    agent {
        docker {
            image 'node:14.18.3'
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Install') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test:unit'
            }
        }
        stage('Build and publish') {
            when {
                anyOf { branch 'dev'; branch 'main'; branch 'feature*'; }
            }
            parallel {
                stage("Build and publish - Android") {
                    steps {
                        sh 'npx eas-cli build --platform=android --profile=production --non-interactive'
                    }
                }
                stage("Build and publish - iOS") {
                    steps {
                        sh 'npx eas-cli build --platform=ios --auto-submit --profile=production --non-interactive'
                    }
                }
            }
        }
    }
}
