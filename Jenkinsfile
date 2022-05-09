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
        /* stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        } */
        /* stage('Test') {
            steps {
                sh 'yarn test:unit'
            }
        } */
        stage('Build and publish') {
            when {
                anyOf { branch 'dev'; branch 'main'; branch 'build'; branch 'feature*'; }
            }
            parallel {
                stage("Build and publish - Android") {
                    steps {
                        withCredentials([
                            string(credentialsId: 'peersyst-expo-token', variable: 'EXPO_TOKEN'),
                        ]) {
                            sh 'rm .npmrc || true'
                            sh "sed -i -e 's/__BUILD_NUMBER__/${BUILD_NUMBER}/' eas.json"
                            sh "cp .env.dev .env"
                            sh 'npx eas-cli build --platform=android --profile=production --non-interactive --no-wait'
                        }
                    }
                }
                stage("Build and publish - iOS") {
                    steps {
                        withCredentials([
                            string(credentialsId: 'peersyst-expo-token', variable: 'EXPO_TOKEN'),
                        ]) {
                            sh 'rm .npmrc || true'
                            sh "sed -i -e 's/__BUILD_NUMBER__/${BUILD_NUMBER}/' eas.json"
                            sh "cp .env.dev .env"
                            sh 'npx eas-cli build --platform=ios --auto-submit --profile=production --non-interactive --no-wait'
                        }
                    }
                }
            }
        }
    }
}
