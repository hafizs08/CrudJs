pipeline {  
    agent any  

    environment {  
        ENV_EXPRESS = credentials('.env-express')  
        ENV_NEST = credentials('.env-nest')  
        VITE_API_EXPRESS = 'http://localhost:3000/'  
        VITE_API_NESTJS = 'http://localhost:3001/'  
        DATABASE_URL = 'postgresql://postgres:admin@localhost:5432/order'  
    }  

    stages {  
        stage('Source Code Retrieval') {  
            steps {  
                echo 'Checking out the code from repository...'  
                git branch: 'dev', url: 'https://github.com/hafizs08/CrudJs'
            }  
        }  

        stage('Environment Setup') {  
            steps {  
                script {  
                    writeFile file: 'express_js/.env', text: ENV_EXPRESS  
                    echo 'Created .env file for Express'  

                    writeFile file: 'nest_js/.env', text: ENV_NEST  
                    echo 'Created .env file for NestJS'  
                }  
            }  
        }  

        stage('Dependency Installation') {  
            parallel {  
                stage('Express Backend Setup') {  
                    steps {  
                        dir('express_js') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  

                stage('Nest Backend Setup') {  
                    steps {  
                        dir('nest_js') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  

                stage('React Frontend Setup') {  
                    steps {  
                        dir('react-js') {  
                            bat 'npm ci'  
                        }  
                    }  
                }  
            }  
        }  

        stage('Application Deployment') {  
            parallel {  
                stage('Launch Express Server') {  
                    steps {  
                        dir('express_js') {  
                            bat 'start /B npm run dev'  // Bisa diganti dengan PM2
                        }  
                        script {  
                            def envContent = readFile('express_js/.env')  
                            echo "Express configuration: ${envContent}"  
                        }  
                    }  
                }  

                stage('Launch NestJS Server') {  
                    steps {  
                        dir('nest_js') {  
                            bat 'start /B npm run start:dev'  // Bisa diganti dengan PM2
                        }  
                        script {  
                            def envContent = readFile('nest_js/.env')  
                            echo "NestJS configuration: ${envContent}"  
                        }  
                    }  
                }  

                stage('Launch React App') {  
                    steps {  
                        dir('react-js') {  
                            bat 'start /B npm run dev'  // Bisa diganti dengan PM2
                        }  
                    }  
                }  
            }  
        }  
    }  

    post {  
        always {  
            echo 'Pipeline execution completed. Performing cleanup...'  
        }  
        success {  
            echo 'All stages executed successfully.'  
        }  
        failure {  
            echo 'Pipeline encountered errors. Refer to logs for troubleshooting.'  
        }  
    }  
}
