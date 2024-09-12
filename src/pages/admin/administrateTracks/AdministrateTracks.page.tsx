import { styled } from "styled-components";
import Button from "../../../components/commons/Button";
import SelectBox from "../administrateUsers/components/SelectBox";
import Input from "../../../components/commons/Input";
import { AxiosTracks, TrackListType } from "../../../services/tracks";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../../recoil/LoadingAtom";

const OPT_IS_PROGRESS = [
  { value: "전체", name: "전체" },
  { value: "진행중", name: "진행중" },
  { value: "지난 트랙", name: "지난 트랙" },
];

const OPT_TRACKS = [
  { value: "0", name: "트랙별 검색" },
  { value: "AI", name: "AI" },
  { value: "SW", name: "SW" },
  { value: "CLOUD", name: "CLOUD" },
];

function AdministrateTracks() {
  const [tracks, setTracks] = useState<TrackListType[]>([]);
  const [isLoading, setLoading] = useRecoilState(loadingAtom);

  const fetchTracks = async () => {
    const res = await AxiosTracks.getTracks({ trackName: "0", cardinalNo: "0" });
    setLoading(true);
    try {
      if (res.statusCode === 200) setTracks(res.data);
    } catch (e) {
      setLoading(false);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <Wrapper>
          <Title>트랙 관리</Title>
          <Button>트랙 등록 바로가기</Button>
        </Wrapper>
        <Wrapper>
          <SelectBox options={OPT_IS_PROGRESS} />
          <SelectBox options={OPT_TRACKS} />
          <Input type="text" placeholder="🔍 기수별 검색" />
        </Wrapper>
      </TitleWrapper>
      <ListWrapper>
        {isLoading ? (
          "트랙 목록을 불러오고 있습니다."
        ) : (
          <>
            <Wrapper>
              <p>No.</p>
              <p>상태</p>
              <p>트랙</p>
              <p>레이서</p>
              <p>코치</p>
              <p>등록된 프로젝트</p>
              <p>트랙 진행 기간</p>
            </Wrapper>
            <TrackInfoWrapper> {tracks.length === 0 ? <p>등록된 트랙이 존재하지 않습니다.</p> : ""}</TrackInfoWrapper>
          </>
        )}
      </ListWrapper>
    </Container>
  );
}

export default AdministrateTracks;

const Container = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  padding: 12px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;

  border-bottom: 2px solid ${({ theme }) => theme.colors.purple2};
`;

const Title = styled.h1``;

const Wrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TrackInfoWrapper = styled.div`
  height: 100%;
  width: 100%;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListWrapper = styled.div`
  padding: 10px 30px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
