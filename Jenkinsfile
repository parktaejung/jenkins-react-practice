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
        stage('3. Deploy to Synology Nas'){
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to Synology NAS via SSH...'

                sshPublisher(
                    configName: 'My-Synology-NAS',

                    transfers:[
                        sshTransfer(
                            sourceFiles: 'build/**', 

                        // [소스] 'build'라는 폴더명은 제외하고 내부 파일만 전송
                        removePrefix: 'build', 

                        // [목표] 시놀로지 NAS의 배포 폴더
                        // (5-1 단계에서 만든 /web/react-app)
                        remoteDirectory: '/web/react-app'
                        )
                    ],
                    execCommand: 'echo "Deployment finished!"'
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