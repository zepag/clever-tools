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
        docker.image('archlinux').inside {
          sh 'echo "hello foobar"'
          sh 'ls /'
          sh 'uname -a'
          sh 'cat /etc/os-release'
        }
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'releases/**/*', fingerprint: true, onlyIfSuccessful: true
    }
  }
}

@NonCPS
String gitTagName() {
    return sh(script: 'git describe --tags --exact-match $(git rev-parse HEAD) || true', returnStdout: true)?.trim()
}
