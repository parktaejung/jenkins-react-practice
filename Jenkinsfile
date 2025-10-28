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