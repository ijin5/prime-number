# 소수 판별기

정수를 입력하면 소수인지 판별해 주는 정적 웹 앱입니다. Python 기초 수업에서 다룬 **함수, 조건문, 반복문**을 JavaScript로 적용해 만들었습니다.

## 기능

- 정수가 아닌 값과 빈 입력을 안내
- 입력 범위: 1 ~ 1,000,000,000 자연수
- 자연수가 아닌 값은 다시 입력하도록 안내하고, 1은 소수가 아닌 수로 처리
- 반복문으로 약수를 확인해 소수 판별
- 합성수일 경우 소수가 아닌 이유와 모든 양의 약수 표시
- 최근 판별한 숫자 5개 표시 및 기록 지우기
- 모바일에서도 사용할 수 있는 반응형 화면

## 실행 방법

`index.html` 파일을 브라우저에서 열면 바로 실행됩니다.

## Cloudflare Pages 배포

GitHub 저장소를 Cloudflare Pages에 연결할 때 다음처럼 설정합니다.

- Framework preset: `None`
- Build command: 비워 두기
- Build output directory: `prime-number`

저장소의 루트가 이 폴더 자체라면 Build output directory에는 `.`을 입력합니다.
