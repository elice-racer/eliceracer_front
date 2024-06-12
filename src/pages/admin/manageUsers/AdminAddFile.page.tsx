import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";

import { AxiosAdmin, TeamsInfo } from "../../../servies/admin";

import * as XLSX from "xlsx";

import DataBoard from "./components/DataBoard";
import UploadRacers from "./components/UploadRacers";
import UploadCoaches from "./components/UploadCoaches";
import UploadTeamBuilding from "./components/UploadTeamBuilding";

//recoil
import { loadingAtom } from "../../../recoil/LoadingAtom";
import { useSetRecoilState } from "recoil";

export interface RowData {
  [key: string]: any;
}
const OPTIONS = [
  { value: "", name: "트랙을 선택해주세요." },
  { value: "AI", name: "AI" },
  { value: "CLOUD", name: "CLOUD" },
  { value: "SW", name: "SW" },
];

const tabList = ["레이서 및 트랙 생성", "코치 멤버 등록", "프로젝트 생성 및 팀빌딩", "오피스아워 등록"];

// todo useParams로 컴포넌트 접근하게 하기
function AdminAddFile() {
  const setLoading = useSetRecoilState(loadingAtom);

  const [teamsInfo, setTeamsInfo] = useState<TeamsInfo[]>();
  const [track, setTrack] = useState({
    trackName: "",
    cardinalNo: "",
    lastRound: "",
  });
  const [data, setData] = useState<RowData[]>([]);
  const [error, setError] = useState("");
  const [tabIdx, setTabIdx] = useState(0);

  const handleChangeTabIndex = (idx: number) => setTabIdx(idx);

  const handleUploadCoachesFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLoading(true);
    if (file) {
      try {
        const res = await AxiosAdmin.uploadMembersCoachFile(file);
        if (res.status === 201) {
          const reader = new FileReader();
          reader.onload = e => {
            const binaryStr = e.target?.result;
            const wb = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = wb.SheetNames[0];
            const ws = wb.Sheets[sheetName];
            const jsonData: RowData[] = XLSX.utils.sheet_to_json(ws);
            setData(jsonData);
          };
          reader.readAsBinaryString(file);
          setLoading(false);
          alert("파일이 성공적으로 업로드되었습니다.");
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };
  /** 팀 정보 조회 */
  const fetchGetTeamsInfo = async () => {
    if (track.trackName === "") return alert("트랙을 선택해주세요.");
    if (track.cardinalNo === "") return alert("기수를 입력해주세요.");
    if (track.lastRound === "") return alert("프로젝트 회차를 입력해주세요.");
    if (Number.isNaN(parseInt(track.cardinalNo)) || Number.isNaN(parseInt(track.lastRound))) return alert("기수에 숫자만 입력해주세요.");
    try {
      const { trackName, cardinalNo, lastRound } = track;
      const res = await AxiosAdmin.getTrackTeamList({ trackName, cardinalNo, lastRound });
      console.log(res);
      setLoading(true);
      if (res.statusCode === 200) {
        if (res.data?.length === 0) setError("생성된 팀을 확인할 수 없습니다.");
        setTeamsInfo(res.data);
        setLoading(false);
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.message);
      console.error(e);
    }
  };

  /** 팀 빌딩 파일 업로드 */
  const handleUploadTeamBuildFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await AxiosAdmin.uploadTeamBuildFile(file);
        setLoading(true);
        if (res.status === 201) {
          const reader = new FileReader();
          reader.onload = e => {
            const binaryStr = e.target?.result;
            const wb = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = wb.SheetNames[0];
            const ws = wb.Sheets[sheetName];
            const jsonData: RowData[] = XLSX.utils.sheet_to_json(ws);
            setData(jsonData);
          };
          reader.readAsBinaryString(file);
          setLoading(false);
          alert("파일이 성공적으로 업로드되었습니다.");
        }
      } catch (error: any) {
        alert(error.response.data.message);
        console.error(error);
        setLoading(false);
      }
    }
  };

  /**트랙 생성 */
  const handleCreateTrack = async () => {
    if (track.trackName === "") return alert("트랙을 선택해주세요.");
    if (track.cardinalNo === "") return alert("기수를 입력해주세요.");
    if (Number.isNaN(parseInt(track.cardinalNo))) return alert("기수에 숫자만 입력해주세요.");

    try {
      const { trackName, cardinalNo } = track;
      const res = await AxiosAdmin.createTrack({ trackName, cardinalNo });
      setLoading(true);
      if (res.data?.statusCode === 200) {
        setLoading(false);
        return alert(res.data?.message);
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
      console.error(error);
      setLoading(false);
    }
  };

  const handleUploadUsersFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 서버에 파일 업로드
        const res = await AxiosAdmin.uploadUserFile(file);
        setLoading(true);
        if (res.status === 201) {
          // 파일을 읽고 파싱하여 상태로 관리
          const reader = new FileReader();
          reader.onload = e => {
            const binaryStr = e.target?.result;
            const wb = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = wb.SheetNames[0];
            const ws = wb.Sheets[sheetName];
            const jsonData: RowData[] = XLSX.utils.sheet_to_json(ws);
            setData(jsonData);
          };
          reader.readAsBinaryString(file);
          setLoading(false);
          alert("파일이 성공적으로 업로드되었습니다.");
        }
      } catch (error: any) {
        alert(error.response.data.message);
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleChangeTrackInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrack(createTrack => ({ ...createTrack, [name]: value }));
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClear = (): void => {
    if (inputFileRef.current) inputFileRef.current.value = "";
    setData([]);
  };
  useEffect(() => {}, [teamsInfo]);
  return (
    <Container>
      <Wrapper>
        <TabWrapper>
          {tabList.map((tabName, index) => (
            <Tab selected={tabIdx === index} onClick={() => handleChangeTabIndex(index)}>
              <Text>{tabName}</Text>
            </Tab>
          ))}
        </TabWrapper>
        <SectionWrapper>
          <Error>{error}</Error>
          {
            [
              <UploadRacers
                options={OPTIONS}
                onChange={handleChangeTrackInfo}
                track={track}
                onCreateTrack={handleCreateTrack}
                onClear={handleClear}
                onFileUpload={handleUploadUsersFile}
                inputFileRef={inputFileRef}
              />,
              <UploadCoaches onFileUpload={handleUploadCoachesFile} onClear={handleClear} inputFileRef={inputFileRef} />,
              <UploadTeamBuilding
                options={OPTIONS}
                onChange={handleChangeTrackInfo}
                onClicktoGet={fetchGetTeamsInfo}
                track={track}
                teamsInfo={teamsInfo}
                onFileUpload={handleUploadTeamBuildFile}
                inputFileRef={inputFileRef}
                onClear={handleClear}
              />,
            ][tabIdx]
          }
        </SectionWrapper>
        <Text style={{ paddingTop: "24px" }}>아래는 업로드된 파일 양식입니다.</Text>
        <DataBoard data={data} />
      </Wrapper>
    </Container>
  );
}

export default AdminAddFile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;

  max-width: 540px;
  margin: 0 auto;
`;

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  margin-top: 48px;
`;

const Tab = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 40px;
  border-radius: 12px 12px 0 0;

  background-color: ${({ theme, selected }) => (selected ? theme.colors.purple2 : theme.colors.purple1)};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};

  transition: all 0.3s ease-in-out;
`;

const SectionWrapper = styled.div`
  &.selected {
    display: block;
  }
  &.unselected {
    display: none;
  }
`;

const Text = styled.p`
  overflow: hidden;
  white-space: inherit;
`;

const Error = styled.p`
  color: tomato;
`;
