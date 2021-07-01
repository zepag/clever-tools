pipeline {
  agent { label 'test-zepag-hyoob-todelete' }
  environment {
    GIT_TAG_NAME = gitTagName()
  }
  options {
    buildDiscarder(logRotator(daysToKeepStr: '5', numToKeepStr: '10', artifactDaysToKeepStr: '5', artifactNumToKeepStr: '10'))
  }
  stages {
    stage('test') {
      steps {
        script{
          sh '''
            docker run centos:8 /bin/bash -c "\
              cat /etc/*release;\
              uname -a;\
            "
            npm --version;
            node -e "console.log('fu');"
            fpm --version;
          '''
        }
      }
    }
  }
}

@NonCPS
String gitTagName() {
    return sh(script: 'git describe --tags --exact-match $(git rev-parse HEAD) || true', returnStdout: true)?.trim()
}
