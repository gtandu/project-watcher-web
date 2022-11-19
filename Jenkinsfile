node (label: 'build && linux') {
  stage('Clean Workspace'){
    cleanWs()
  }

  stage("Main build") {
    docker.image('node:latest').pull()

    // Permorming Install and Lint
    docker.image('node:latest').inside {
      stage('Install') {
        sh label:
          'Running npm install',
        script: '''
          node --version
          npm install
        '''
      }

      stage('Lint') {
        sh label:
          'Running npm run lint',
        script: '''
          npm run lint
        '''
      }
    }

    stage ('Build') {
      docker.image('node:10').inside {
        sh label:
          'Running npm run build',
        script: '''
          node --version
          npm run build
        '''
      }
    }
  }

  stage("Deploy") {
    def containerName = "project-watcher-web"
    // Any change in Volume will automatically result in Hot Reload of Nginx
    def rc = sh (script: "docker inspect -f '{{.State.Running}}' ${containerName}", returnStatus: true)
    if(rc == 0) {
      echo "Container ${containerName} exists..."
      try {
        echo "Nginx will reload changes from the mounted file system..."
        echo "Removing old container and creating a new one..."
        sh "docker system prune -af"
        sh "docker rm -f project-watcher-web"
        sh "docker run -d -p 7001:80 -v $WORKSPACE/project-watcher-web/dist/project-watcher-web:/usr/share/nginx/html/ --name ${containerName} project-watcher-web"

      }
      catch(err) { // timeout reached or input false
        echo "Doing Nothing!"
      }
    }
    else
    {
      echo "Container ${containerName} does not exist... Creating..."
      sh "docker run -d -p 7001:80 -v $WORKSPACE/project-watcher-web/dist/project-watcher-web:/usr/share/nginx/html/ --name ${containerName} project-watcher-web"
    }
  }
}
