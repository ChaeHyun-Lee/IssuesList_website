# github-restAPI-issueslist
<br>

![github_issues](https://github.com/ChaeHyun-Lee/IssuesList_website/assets/88769484/578710ad-d580-4669-8103-5a0ad74267e9)

<br>
<br>

 
## About
1. 목표
   특정 깃헙 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

2. 참고자료
    - [GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
    - 와이어 프레임
      <br>
      <img width="474" alt="Untitled" src="https://github.com/ChaeHyun-Lee/IssuesList_website/assets/88769484/f98c09ad-b9ed-48f7-ba6c-2663fea2cbc0">


3. 과제 범위
    - 이슈 목록 화면
      1. 이슈 목록 가져오기 API 활용
      2. open 상태의 이슈 중 코멘트가 많은 순으로 정렬
      3. 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
      4. 다섯번째 셀마다 광고 이미지 출력 - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
      5. 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)
    - 이슈 상세 화면
      1. 이슈의 상세 내용 표시
      2. ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
    - 공통 헤더
      1. 두 페이지는 공통 헤더를 공유합니다.
      2. 헤더에는 Organization Name / Repository Name이 표시됩니다.

4. 요구 사항
    - 이슈 목록 및 상세 화면 기능 구현
    - 데이터 요청 중 로딩 표시
    - 에러 화면 구현
    - 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시
   
<br>

 
## Stacks
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black"/><img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black"><img src="https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white"/><br>
<br>
<br>

## Pages
**Issueslist page**
![listpage](https://github.com/ChaeHyun-Lee/IssuesList_website/assets/88769484/60aa0aa1-bb7e-4b22-81ce-7b79ab46f070)<br>

**IssuesDetail page**
![detailpage](https://github.com/ChaeHyun-Lee/IssuesList_website/assets/88769484/7c5ba99e-3c31-4648-aed2-b98932090387)


## Demo Video
![issues_list_video](https://github.com/ChaeHyun-Lee/IssuesList_website/assets/88769484/312ca2cc-c66e-495b-8ced-b09a8a3c729c)
<br>
<br>
