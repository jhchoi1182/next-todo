![image](https://github.com/jhchoi1182/next-todo/assets/116577489/37675973-b846-4f0e-bfa8-05c13919ec9b)

## 특징
* Next.js를 통한 백엔드 작업으로 Mongo DB에 연결
* 동적 세그먼트인 디테일 페이지를 SSG 방식으로 변경

<br>

## 트러블 슈팅

<br>

1. 동적 경로 세그먼트에 대해 SSG를 적용하려는데 API의 URL을 분석할 수 없다며 오류가 발생.

2. 다른 곳에서는 잘 작동 되기에 API 로직 자체엔 대해선 문제가 없다고 판단. API URL을 수정 => 실패

3. 공식 문서를 참고해 12이전 버전에서 사용되던 handler함수 방식을 사용해봄 => 실패

4. 키워드를 바꿔가며 구글링하다가 상대 경로로 사용하는 URL을 절대 경로로 수정해 비슷한 문제를 해결한 글을 발견

5. 추가 검색으로 Next.js에서 제공하는 기본 기능으로 process.env.NODE_ENV가 개발 환경에 따라 값이 스위칭된다는 것을 것을 확인

6. 상대 경로를 절대 경로로 바꾸고 개발 환경에 따라 URL을 바꾸는 로직으로 문제 해결
<br>

- 최신 버전이라 검색해도 안 나온다고 겁 먹을 필요 없는 듯

<br>

## 렌더링 속도 개선

<br>

기본적인 CRUD인데도 req / res 속도가 너무 느린 것 같음. (몽고DB 자체가 조금 구린 것 같다.)

바로 개선 돌입!

- 측정 항목 - isDone 수정 시 렌더링 반영까지 걸리는 시간
- 측정 조건 - todo가 10개일 때 수정이 반영되기까지 걸리는 시간

<br>

**로직 변경 1**   
async / await를 기다릴 필요 없이 업데이트 시킨 후 오류나면 원래대로 되돌리는 로직으로 수정

<br>

**로직 변경 2**   
response로 받아오는 값 메시지로 바꿔서 요청 속도 단축시키기

<br>

**before : 10번 평균 3.7ms**

 ![image](https://github.com/jhchoi1182/next-todo/assets/116577489/89c418fd-51e5-40b8-a3bc-193b81cf4440)

<br>

**after : 10번 평균 1.97ms**

![image](https://github.com/jhchoi1182/next-todo/assets/116577489/25ada9e9-d9be-4f34-92bf-b11432788951)

<br>

**렌더링 속도 53% 개선**
