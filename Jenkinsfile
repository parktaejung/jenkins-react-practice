//Jenkinsfile
pipeline {
    //1. 실행환경정의
    agent any //젠킨스 서버 어디서든 실행

    tools {
        //Global tool configuration에서 설정한 Nodejs이름
        nodejs 'NodeJS 22'
    }

    //2. 작업단계(stage)정의
    stages {
        stage('1. Install Dependencies'){
            steps{
                //npm install 실행
                echo 'Installing node modules...'
                sh 'npm install'
            }
        }
        stage('2. Build Project'){
            steps {
                //npm run build 실행(정적파일 생성)
                echo 'Building production app...'
                sh 'npm run build'
            }
        }
        stage('3. Deploy to Synology NAS') {
    when { 
        branch 'main' 
    }
    steps {
        echo 'Deploying to Synology NAS via SSH...'
echo 'DEBUG: Checking if build files exist...'
        // 'build' 폴더 안의 파일 목록을 콘솔에 출력합니다.
        // 여기서 파일이 안 보이면 빌드가 잘못된 것입니다.
        sh 'ls -l build/'
        // [수정!] 'publishers' 리스트와 'sshPublisherDesc'로 감싸줍니다.
        sshPublisher(
            publishers: [
                sshPublisherDesc(
                    // 'Configure System'에서 설정한 서버 이름
                    configName: 'My-Synology-NAS', 

                    // 전송할 파일 설정
                    transfers: [
                        sshTransfer(
                            sourceFiles: 'build/**', 
                            removePrefix: 'build', 
                            remoteDirectory: '/web/react-app'
                        )
                    ],

                    // 전송 후 NAS에서 실행할 명령어
                    execCommand: 'echo "Deployment finished!"' 
                )
            ]
        )
    }
}
        // (참고) 테스트 단계
        /*
        stage('3. Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test' 
                // create-react-app의 기본 테스트는 CI 환경에서 멈추므로
                // package.json의 test 스크립트를 수정해야 할 수도 있습니다.
                // 지금은 빌드까지만 집중합니다.
            }
        }
        */
    }
    // 3. 파이프라인 종료 후 작업
    post {
        always {
            echo 'Pipeline finished. Cleaning up...'
            deleteDir()
        }
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}