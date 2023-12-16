import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams를 사용하여 이슈 번호 가져옴
import styled from "styled-components";

const Header = styled.h1`
  display: flex;
  justify-content: center;
`;

const IssueItem = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  padding: 50px;
  align-items: center;
`;

const ExceptComment = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const DetailWrapper = styled.div`
  display: flex;
`;

const IssueNum = styled.div`
  margin-right: 20px;
`;

const Title = styled.div``;

const Author = styled.div`
  margin-right: 20px;
`;

const Date = styled.div`
  margin-right: 20px;
`;

const Comment = styled.div``;

const IssueBody = styled.div`
  padding: 50px;
`;

const AvatarImage = styled.img`
  max-width: 150px;
  margin-top: 10px;
`;

const IssuesDetail = () => {
  const { issueNumber } = useParams(); // 라우트 매개변수로부터 이슈 번호를 가져옵니다.
  const [issueDetail, setIssueDetail] = useState(null);

  // 이슈의 세부 정보를 가져오는 함수
  const fetchIssueDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react/issues/${issueNumber}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_ACCESS_TOKEN,
          },
        }
      );
      setIssueDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIssueDetail();
  }, [issueNumber]);

  // 이슈 세부 정보가 로드되기 전에 로딩 상태를 처리할 수 있습니다.
  if (!issueDetail) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingRight: "10px",
        paddingLeft: "10px",
      }}
    >
      <Header>Facebook / React</Header>
      <IssueItem>
        <AvatarImage
          src={issueDetail.user.avatar_url}
          alt={`${issueDetail.user.login}'s avatar`}
        />
        <ExceptComment>
          <TitleWrapper>
            <IssueNum>#{issueDetail.number}</IssueNum>
            <Title>{issueDetail.title}</Title>
          </TitleWrapper>
          <DetailWrapper>
            <Author>작성자: {issueDetail.user.login},</Author>
            <Date>작성일: {issueDetail.created_at}</Date>
          </DetailWrapper>
        </ExceptComment>
        <Comment>코멘트: {issueDetail.comments}</Comment>
      </IssueItem>
      <IssueBody>
        <div dangerouslySetInnerHTML={{ __html: issueDetail.body }} />
      </IssueBody>
    </div>
  );
};

export default IssuesDetail;
