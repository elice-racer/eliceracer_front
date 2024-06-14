import { Link } from "react-router-dom";
import styled from "styled-components";

interface MyTrackInfoProps {
  myTrackInfo: {
    track: string;
    notion: string;
  };
  myProjectInfo: {
    gitlab: string;
    projectNotion: string;
    teamNotion: string;
  };
}

function MyTrackInfo({ myTrackInfo, myProjectInfo }: MyTrackInfoProps) {
  return (
    <LinkWrapper>
      <Absolute>📌</Absolute>
      <SubTitleWrapper>
        <SubTitle>✏️ 수강 중인 트랙</SubTitle>
        {myTrackInfo ? (
          <Link to={myTrackInfo.notion}>
            <SubTitle>{myTrackInfo.track}기 노션 바로가기</SubTitle>
          </Link>
        ) : (
          <Text className="info">현재 진행 중인 트랙이 없습니다.</Text>
        )}
      </SubTitleWrapper>
      <SubTitleWrapper>
        <SubTitle>✏️ 내 프로젝트</SubTitle>
        {myProjectInfo ? (
          <>
            <Link to={myProjectInfo.gitlab}>
              <Text>Gitlab바로가기</Text>
            </Link>
            <Link to={myProjectInfo.projectNotion}>
              <Text>프로젝트 노션바로가기</Text>
            </Link>
            <Link to={myProjectInfo.teamNotion}>
              <Text>우리팀 노션바로가기</Text>
            </Link>
          </>
        ) : (
          <Text className="info">현재 진행 중인 프로젝트가 없습니다.</Text>
        )}
      </SubTitleWrapper>
    </LinkWrapper>
  );
}

export default MyTrackInfo;

const LinkWrapper = styled.div`
  position: relative;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Absolute = styled.div`
  font-size: 1.6em;
  position: absolute;
  right: 4px;
  top: 4px;
`;

const SubTitleWrapper = styled.div``;
const SubTitle = styled.h2`
  font-size: 1.2em;
`;
const Text = styled.p`
  &.info {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
