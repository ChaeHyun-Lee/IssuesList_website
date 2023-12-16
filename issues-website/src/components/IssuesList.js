import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = styled.h1`
  display: flex;
  justify-content: center;
`;

const IssueItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 20px;
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

const LinkWithoutUnderline = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
  }
  display: flex;
  justify-content: center;
`;

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchIssues = async () => {
    setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
    try {
      const response = await axios.get(
        "https://api.github.com/repos/facebook/react/issues",
        {
          headers: {
            Authorization: process.env.REACT_APP_ACCESS_TOKEN,
          },
          params: {
            state: "open", // 오픈 이슈 필터링
            sort: "comments", // 댓글 수를 기준으로 정렬
            direction: "desc", // 내림차순 정렬
          },
        }
      );
      setIssues(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 데이터 요청 완료 시 로딩 상태 해제
    }
  };

  const loadMoreIssues = async () => {
    if (!loading && hasMore) {
      setLoading(true); // 추가 데이터 요청 시작 시 로딩 상태 설정
      try {
        const response = await axios.get(
          `https://api.github.com/repos/facebook/react/issues?page=${
            currentPage + 1
          }`,
          {
            headers: {
              Authorization: process.env.REACT_APP_ACCESS_TOKEN,
            },
            params: {
              state: "open",
              sort: "comments",
              direction: "desc",
            },
          }
        );

        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setIssues([...issues, ...response.data]);
          setCurrentPage(currentPage + 1);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 추가 데이터 요청 완료 시 로딩 상태 해제
      }
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    console.log(issues);
  }, [issues]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreIssues();
    }
  };

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
      {issues.map((issue, index) => (
        <React.Fragment key={issue.id}>
          <IssueItem>
            <ExceptComment>
              <TitleWrapper>
                <IssueNum>#{issue.number}</IssueNum>
                <LinkWithoutUnderline
                  to={`/detail/${issue.number}`}
                  key={issue.id}
                >
                  <Title>{issue.title}</Title>
                </LinkWithoutUnderline>
              </TitleWrapper>
              <DetailWrapper>
                <Author>작성자: {issue.user.login},</Author>
                <Date>작성일: {issue.created_at}</Date>
              </DetailWrapper>
            </ExceptComment>
            <Comment>코멘트: {issue.comments}</Comment>
          </IssueItem>
          {index % 5 === 4 && (
            <LinkWithoutUnderline to="https://www.wanted.co.kr/jobsfeed">
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjQAAABZCAMAAAAeoE6cAAABJlBMVEX///8AAAAsW/Ik4LxDi/86aPkASdu6urpjY2Pp6emRkZF5eXm0tLQoKCjw8PCWlpbAwMAA3ridnZ3d3d2KiorX19ft7e339/fPz88ARNmsrKyFhYVsbGzj4+Mwg/9Fjv8h5rgwMDAdU/JFRUXIyMgASfE9iP9zc3NXV1dMTEwSEhIfHx9nZ2ckV/I2NjZBQUFr6M2fsPjF9eqzzf8vXvLi+/by/fvt9P/m7P2dv/+vvfmCrv/n+/dal//K1PvX3vyRpfdtifVJ5MUYU99HfPt06dB1j/W48+WK7Nd6qP9knf/W5P9GbvNWePSSpvelxP/Czft9lvY0kek/qOA3x89AbfkcWuEpZuaX7ts7vNYz0sg9rd4vbes2neNFj+64xfo018U7uNgJAYmuAAAReklEQVR4nO2de0MaORfGGVFBxAsIYgGxjIB4gaqtt15stVpdtbvt7na3u+9l9/3+X+JlmFvOyUkmCQPFLs9fyiTMTOY355wkJyGRmGgiHZXK89/6EiZ6XFqrWlb6W1/ERI9Ii/kFy5pAM5G6HCNjTaCZSFmL+bplTaB51CqO9nSlPYvRBJpHqNWMVR3tGdetCTSPWkXnrR9xr3cCzaNWttt/bhNoJlLUYsZ/buMPzfHro6PXxyYnOzk5PTkxqnh6empU8TtWkYlGxxma1ze3+8mcp+Tl7c2R4llOzs9+eFPzNH336vm9csWDDw9205X98OHgvKRY8zvXSp19bmMLzeG1w0uSkYPO/k2kzbk/6/HSak0HarVatdoPzyNNx/3BQ9O2O50pX52ObTc/Hpxq3eH3qZQ1/tAc3SYhMAw5+4eS7z8526gxvDDk9Lg5l1V82SMm5CVUx24+vPzH25vxh+ZwX0CMx83ljeDbT1/RxPjcbDwXVDx51yGJ8bnp/PgPD3HGHZqjSxkxHjaUtTmRItMXjU3pnW0LiXFl2z/G2xCPTGMOzW0kMn1s9l/jij9FItPH5g0XFP81FYVMH5sXn4bSIo9DYw3NYVKJGQebr6Di6ZuaAjJ9J3UGKp5cNBWQcZxU8+KfG9qMMzRqZsY3NkzF50pmxjc2TIBy3lExM56xmXo7giYaS40xNNHRDKAmGbioV4pmxjc2gYs6aIrjX8rYvBxZS42XxhaaY2XXFGDjxcN3Wsw4xsaLhz8ruqZAzXejba9x0bhC81qTmJCaN+quCVJzoe6aAmo+j7bBxkRjCo0JMy41Bsy41Bgw0wtsxoqaUjFb2KpWtwrZhmGUXmosVdvb2+1qJrUqLrWsC02pmFqar1ar8/nUitblFLO9entOvXX/MyE0x0bMONTcmTDTo+b8swkzSh5qOcUqSz7OBigyRxUpwq9Zx8cXy222NTfzq97HWUZ+ll2J/TCb8j5NgW/o5hfhGYLiFfDc2in/QBlVcDWX34bl8xIeGa0voXru1wuhuTSE5unPZsxMb/xuhIxDTWQ0PA/u0kpRZWAR8t2FLWihJMuVqsVpzylTBB8VvOJzsGT/s+wu9w0FlvBF/gxYhBlptIly7bWoRkssbxP1nDsSQXOtGwP7zPzSedgwYqb2ZPaFKTVRPe81eONUdmQDFtkhipRgkQVwcJVAxtF2MbECPsh4FSA0u85XUA/J2lkTXgElDpriM0HJbbmbanQF9drrq+D/AJobQ2Zyv3ZmZq6MqJmdnX1vCE1nKip+2IH3TZTYQk1DvIiIqwp7rCx+jFsQWSE00CAxKgdnMYBmXlK2khCqJHgH+oLf6UPz2pCZZPLLTE8GDmrjtx40s78ZUmNfRECDkCCy9xUaFMYRAKt0xKNkJIJGyIxl5Y2hmVuQFu6KQpuVHWk9IB8a84BmyoHmi7ap2bh64kBj7qAi5qFgZyN8CoEauCkI/7QrKrAofzRQNDQLq4LifS0bQiMBkSoubg2ZPGjMnZM905e+g5p19d6Umo4cGtTa21wB7J0I/wTDP2srOCB93pxoaOqb0kqLRtCsRRenjC5+xSLkQWNoZ5JPr2Y86Rqa35941Bg7qIhMCdSB4GIgvi04/4TCFv/tV3mSrGhoItQ2gWYlunRP3MCBEmuMXGi+mhqaPzo+NLo9KJ8Zc1Njy7OysvBGl9Fhwh5z/knEnY5vsgyh8eyeFjSKMO/iF0jPcHrQmA7rJZ8+zATSioVDQzOAqZEPDKOWwMMwVB8DG26iqRztEVVlMoNmWx8aanSGEp6lrmtdmFc/BkOja2pmQ5l2u6NMDYoZpEC4Qv4JGaOs93GWqiqTGTSuF9GBRjIIgATHOpf0rsuDxtjQtF6E0OhENRv/fsJQY2xqDqTQ5AVtSwHhCvmnAjzqhaYKY7RIhtBkNKHRuTD2NjUvy3KhOTQdo/mTMTS9DpQGNO9nYzA1nRkpNKjvAzvd9AgY9E+ww73pfUqMge3u5bOpbL7KTwn0JYVmd6ucSpXnicHYriIJPjQV7shOtZxaTpUJd5phbpMacWpnsqlUtiLo4DnQ7Jsaml+mWGg0xmpqrKExH6uxZSticLwKO910axTYIugZe9DxHZS9sKu+Rg75SaDZCRxFkX9AzjhcqVJwlYEBy7OM93mh4g3XcdFsN4z9U3V8MIyF+Ruqh/O7qxnuqOVCY2po2DBYKxTe+B0wM6xQGN0we0jUx2TLoBDB66hiLOrQ7a0RA6tiaNps1QI+Cjt80Nvy06u4OrSs+OGHR7nxqjKoWCLsVNrcO+X+nILQqPun9xCaIfknNDraYA6J5mdY/wTx8CYrkc+z9vBJS/xsoRCaTVgVXxR87FHQoMoNdBgP3wXXiz7f4VJE+Dg5PcD09r8QNMr9pxb0TgPMJchXiMNbrQiPhCoIyyy5H6L3eSvBiwtPhNDg8RIUE8Gp+QhoEBR4WApn/gXD38ie7hATwRw16QH6ThsvIDQzitDAvtNA/kmeVwNDQ6ZvJB4BFZbxvBD0PshUuOKCCxE03HwY6szDKCwCGhifF/DhBDZk/heg5AwyFQ275HTi2DSkyc1gKSaXu/PbcUDT+UDdYyDUrw6Hz0H7AX8S+icyIkIej0ya48ZLRNDwNeHxZ+BYBDTg6C55XdTZUe+sTFbEXbj0AB3uKQzNlaJ7eo+hMQ5qvpA3KWimMvn5DgAhfEXroK7n2yBJS4LTIjcjgIZIDIOvdB0ck0MDaSYTFRHM7isE36s6WY9zymnzCe4/jKHB3snY0kQNCkObHfRVgOepQIT8MsjJeCEA7BeLEsHQsKIAGuKthkwuSL4UQwOAoJIQHYFvcAe4YbxCw8Y1RlprSSUrLg5WHqnh4uDZWVNoIiJhFB36H4NYpwHR8v1TlqoKuxrCFQGIDgE0RKYgPKkONMDhLqRpAQvo2lQ4+iNsSBj5pM2H9v6D42DFSJiPg2dnv5hamohULPoxoYYC/Qr/CUMj5bkS2OHmeyi+4LCiABoi5oQ9HB1oRGnBYrl2t07cJSF48rR5zt5/Y4RmSN0n9CJ5AcsaaihgP/wYErawxwe0XHQY7Ah2VATQENXh9+tAY2mr78Og6aTDYK7JetAYMpN8Os1Do+SdKGiMJxLkc5Yo9vOeAvBOjhsHaLl9a9RNor5ugTwj8YDHE5r+PcFgRbzGBV76ANBcccyYQ2PITCQ0qLPoegQw1lLCLLiPGAaIfggNHhyfQRoIupkRQKM/9e6ef477RCBQLl5olGafYoUmancs2N3p219gattck7v+CcYIfioNsFGSPS5hR3YE0OinN7jzoXC2UrIsCJT73qHBERx+8q4bB2g5/gm9uf7zBVW5aadQKuueYoUGT4mpyDG70AuPAJrWI3BPuDWdj0DHc5V/IBnu6QWzBRNL4925ce+Jm3oaoPdkHAhHLuqug9stopfLwwGg5Twr2P0JJolApCOJaeB4y6OJacR7BMBe1gDQ/DwO4zR/SXjpCw6yZpC18HEAM9MreCIgmLRS7T3BMHqMe0/wksS9J7wBwLUpNL8YQjN9xUMzYwqNPHcvgb32M8SDjwNAawlZ7W7wZbBXJO5swJHBkUOTTanIqQYtlHicBvrbtPFSBGIaQTWhhoPGeEFCM3oDfJjMsAggCibo0Kf0OAsOAXCeU6hdsv4woQGmkl8NJxQYuxaH9tBeDzBh+WsHQ3OlxkyLMzTG0ERuHoHDk2Vw++GcNnjMc3AgOUyXgC+mcO4Jpd2OAhqQtCm2GJzgpJKwWB0USyeOTFMj/ubckyI0G/GlRjxENwu0rFVB9gxAqwKsE5ucAodvRMSiVJxRQAOOthPKgpcqmuVGb0E6vrxy5cxynFduDo3S7nuWUAwOkl0T2OcDE0v4rSjIM44CGjgyJBnalZ6xKyiFks/Tg+wyElu6p3EcHNl5SshW0bItLywEQheUA0qbGpxTOwpo4PXT2WGpBn9KlCmTJarxQ4fpARbl/g8nlqsxwyfUmC/MVfkhKJRRLcBBvA+U+NnQ43vc6OwwoOGyGGDSH0WzM9ays1VGC9ZRTgVpo/CSrAGWsCT/Nl3CgoOaYYY0spWtbNMKd2iBjwctM8kkOJW4PSWGAQ2XmAnHE6lt0gIfs11ZDofxUJYhNfjELd103hVDZtBSbo3F3OyeEY6GtJjbl2gzBdDDFKIFg0O8HpFL+1df9zQQNFy3Gl0/PxwgyGLEExBdzkjxiywdaEwTPpF/0tg2Avon8x1q1H6mULSbAsRBhBZ6tng/zjYcey8S67njgQbdBTeJgWwg3iUNJQiFpoi7b8ibYIWleaf7EkCj8esIMW0A8JFvdkqi2Tz41ARo4e4rv2SqEOZtrvN7sllxQYNDM39/V98y4FAKzgng3mGIOn9DzIbDpTx31PJCuXj6Txr708D+k7GhUf3NMDqBFr2rgu2guIEywiJtLqWK68VURpCoGw80/EL9hfZeut0NbAo2CUy8VcJhCbsylNgaYne+3FgpLucF1rcPjflqbtsgDO5TE4eheaHIDA4HPGEc6H01uPRv/SyEeKARBl0+NHxOTaHomKFSkd+EhD139IagWG6nMY7kcq2NsFhTM7y0CF/0/oUYBxKtZ/y30QhKFA80XDTlK4heqG1Bdnap/YHhqCTpU2VyoTGefwpNjZahmWb2Txu+oaF3VuRGP8nsN2rQV76XK6+YoBHF82HIW1e8IPwmaN6PPzw1eFSjublnaGpMR4ObKqPBnritXyxq1JRqc2rCWHNH2LigEZ02hEY16RMnW+k6KA8a8w7UC+2uk0fN+9F0nYStwu/cTZh3OtFKMyM3JmiI/dHwjajtIc3nWmnuPekPhBsvzv1fR3OMxpc7VmM8RqOQScOId+zExgoEWtSWHXRJieKCRmBqWPpVNvikprL1NvgMZk8GSxXWRsZ3UMNaJYfE73xFDbTzaFFbwjtS2xrcU1zQCGbRgMmMpoZOf9CK7gNozNNqTJxTn5rfBphA0HFOCSrzgcqH5e2/8AtXpYunIX2xQUM7KIW9biPu25F4WpdXOE9r2oN6+mvH7Oeeej0o856T5s9F8padKsU1uOyXIqng2lMFuq/4oCF7xyg4o394zFNbnGmzLnsN5uvsf8zkvnlYY2RoHOn8IjcwNPIdRgjhHcCozfL4vqc4CzhBbuLaV3dN6ZfljKCh3AgX0QvD2h1RZp7wu13tLifq7P9sRsi+GTWXiTMzalonf+n+KLerZuQaBE64IeltQnBSTcSXLhMvZ9d5MEq/YRkJDbk30Qp3TuIHnPLUiN5uZOpwiYyH605mFpiHBWlEl0bUHCfMqKn1+j8vTaiJ+n0wSouFDKsC7d6KsFR0gvYKTCfuOab+x3OZpVAZ314tsp8uZYhLWAElBNmkDWg1n5FL3BrYkc1LrWagZfzeeHeUX+o1WqHS0/z8PLwwE1tz7FTUp6bV6veZDagxYWaImksVtra79c1qhf8F5iGp1Fja2q7Xu+35Jclvga84F1bfrW9vFVI6V1bMVqqbOvV09xTOXXoVf9KkprXh7Zb3qakX2HTsqB/KnWjU0ksYzl0HFc9rOj/4VLsL3pD7F7YGM/aM1qDeRCPRYVIdm9wNU/HkjbKxadXO2IoX6tQ05RsHT/SNdKzqonKXR7DmmaKxqW2gHvNLWw0bu6MxSTnRSHWo0ovKJW+4iqd3CthAM+Pq5EIhsuk0P8t3DZ7om+omykflcrfHVMXzNxHYtGqvyCf/9mMENp3mx0kEPOaSYpNLfiWRcXQusTatWu2VMI49v2jaIm46dvNigswj0OF1LkeBk8vt846J1f3ZdK3Fg9Mj5u651L+c/jhDcdMj5svBpM/0WHR420MkRKf/5/WN0MiEuj+7q9V65ATq/fODnBhXbw8+Npu2bXdc9f5q2h8PtGeaJvqmOj66+Xp7fX29f319e3tzqACMr/vzn85euTp7/lYjhL3/dPDu8wdHn98dfJqYmDHU/wEAXBUhPqY5EgAAAABJRU5ErkJggg=="
                }
                alt="광고"
                style={{ width: "60%", padding: "10px" }}
              />
            </LinkWithoutUnderline>
          )}
        </React.Fragment>
      ))}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Loading...
        </div>
      )}
      {hasMore && !loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Scroll!!
        </div>
      )}
    </div>
  );
};

export default IssuesList;
