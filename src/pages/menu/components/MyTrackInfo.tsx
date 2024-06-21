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
          <a href={myTrackInfo.notion} target="_blank" rel="noopener noreferrer">
            <SubTitle>{myTrackInfo.track}기 강의실 바로가기</SubTitle>
          </a>
        ) : (
          <Text className="info">현재 진행 중인 트랙이 없습니다.</Text>
        )}
      </SubTitleWrapper>
      <SubTitleWrapper>
        <SubTitle>✏️ 내 프로젝트</SubTitle>
        {myProjectInfo ? (
          <>
            <a href={myProjectInfo.gitlab} target="_blank" rel="noopener noreferrer">
              <Text>Gitlab바로가기</Text>
            </a>
            <a href={myProjectInfo.projectNotion} target="_blank" rel="noopener noreferrer">
              <Text>프로젝트 노션바로가기</Text>
            </a>
            <a href={myProjectInfo.teamNotion} target="_blank" rel="noopener noreferrer">
              <Text>우리팀 노션바로가기</Text>
            </a>
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
