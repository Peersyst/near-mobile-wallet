def PROJECT_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
def envFileName = UUID.randomUUID().toString()
def envFileDestination = "/tmp/${envFileName}"

pipeline {
    agent {
        docker {
            image 'cypress/base:14.18.3'
        }
    }
    environment {
        CI = 'true'
        CYPRESS_CACHE_FOLDER = '/tmp/cy'
        NPM_CONFIG_PREFIX = '/tmp/.npm'
        HOME = '/tmp'
    }
    stages {
       stage('Install') {
           steps {
               sh 'yarn install --frozen-lockfile'
           }
       }
       stage('Lint') {
           steps {
               sh 'yarn lint'
           }
       }
       stage('Test unit') {
           steps {
               sh 'yarn test:unit'
           }
       }
       /* stage('Test e2e') {
           steps {
               sh 'yarn cy:install'
               sh 'yarn test:e2e'
           }
       } */
       stage('Build') {
           steps {
               sh 'cp .env.test .env'
               sh 'npx expo-cli build:web'
           }
        stage('Deploy test environment') {
            when {
                branch 'dev'
            }
            steps {
                sshagent(credentials : ['jenkins-ssh']) {
                    sh 'scp -rp ./build/* ubuntu@dev.peersyst.com:/home/ubuntu/${PROJECT_NAME}'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@dev.peersyst.com sudo rm -rf /var/www/${PROJECT_NAME}/*'
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@dev.peersyst.com sudo mv /home/ubuntu/${PROJECT_NAME}/* /var/www/${PROJECT_NAME}/'
                }
            }
        }
    }
}
