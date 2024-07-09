# ElicerRacer

엘리스 부트캠프를 수강하는 레이서를 위한 팀 프로젝트 협업 서비스

오피스아워 시간관리, 오피스아워 시작 및 QR 체크 알림 기능을 통해 보다 개발에 집중할 수 있는 프로세스를 경험해보세요!

## 기획 목적

- 프로젝트 진행에 원활한 일정관리를 위함.
- 개발에 몰입 중 QR체크, 오피스아워 시간 등을 놓치게되는 이슈를 방지하기 위함.
- 해당 프로젝트 관련 스케줄 리마인드를 통한 편의 제공

## 해결하고자한 문제

- - 알림 기능을 통한 프로젝트 일정 관리
- 10분 전 알림을 통해 효율적인 팀별 일정 리마인드
- 프로젝트 관련 공지 및 팀별 일정을 보다 빠르게 확인함으로 짧은 일정에 맞는 개발에 몰입할 수 있는 환경 제공

## 버전별 기능 안내

### v 0.0.1

- 채팅
- 프로젝트 팀별 오피스아워 알림

### v 0.0.2( ~ 2024.08 업데이트 예정 )

- 해당 팀 오피스아워 일정 변경 기능
- 관리자 알림 등록/수정
- 유저 간의 `좋아요` 기능

## 기술 스택 및 라이브러리

**Frontend**

- TypeScript + React + vite
- PWA + Service worker
- styled-components
- react-calendar
- recoil
- soket.io
- FCM
- github Action / CICD

**Backend**

- TypeScript + NestJS
- TypeORM + PostgreSQL
- Socket,IO & NestJS Websockets
- Passport
- JWT
- Jest
- Swagger
- GitHub Actions
- AWS RDS
- AWS Elastic Cache for Redis
- AWS S3
- github Actions

**Infra**

- AWS Route53
- AWS CloudFront + S3
- AWS Application Load Balancer
- AWS Elastic Container Service
- AWS Elastic Container Registry
- AWS EC2
- AWS Code Deploy
- AWS CloudWatch
- Docker

## ERD

version 1.0.0
![erd v 1.0.0](https://github.com/elice-racer/eliceracer_front/assets/124546770/98dd7d0d-5fb3-4d9b-8b5c-7f023f065103)

## 프로젝트 실행 방법

### 클라이언트 실행방법

`.env`파일에 아래 값을 넣어주세요.

```env
VITE_BASE_URL=""
VITE_SOKET_IO=""
VITE_NOTIFICATIONS_URL =""

VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""

VITE_VAPID_KEY=""
```

터미널에 아래 명령어를 순서대로 입력해주세요.

```bash
yarn
yarn dev

```

### 서버 실행 방법

```bash
yarn install

yarn start:dev

```

## 프로젝트 아키텍처

[서버 github]()
[클라이언트 github]()

## 사용 스택

## 클라이언트 UI

- 다양한 기기로 접근 가능하도록 반응형으로 제작
- 아래는 로그인페이지, 메인페이지 예시
  ![ui-example](https://github.com/elice-racer/eliceracer_front/assets/124546770/235e9adb-ca8a-4acd-89c3-209df517a1d8)

## Team ElicerRacer

- 이혜빈
- 진채영

## 추가 예정 서비스

- 팀원간의 일정 공유
- 팀원내의 알림 기능
- 레이서들만의 대나무 숲, 게시판 기능
