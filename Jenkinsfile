pipeline {
  agent { label 'test-zepag-hyoob-todelete' }
  environment {
    GIT_TAG_NAME = gitTagName()
  }
  options {
    buildDiscarder(logRotator(daysToKeepStr: '5', numToKeepStr: '10', artifactDaysToKeepStr: '5', artifactNumToKeepStr: '10'))
  }
  stages {
    stage('test-raw') {
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
    stage('test-agent') {
      agent {
        docker {
          image 'archlinux'
          // Run the container on the node specified at the top-level of the Pipeline, in the same workspace, rather than on a new node entirely:
          reuseNode true
        }
      }
      steps {
          sh 'echo "hello foobar"'
          sh 'ls /'
          sh 'uname -a'
          sh 'cat /etc/os-release'
      }
    }
  }
}

@NonCPS
String gitTagName() {
    return sh(script: 'git describe --tags --exact-match $(git rev-parse HEAD) || true', returnStdout: true)?.trim()
}
