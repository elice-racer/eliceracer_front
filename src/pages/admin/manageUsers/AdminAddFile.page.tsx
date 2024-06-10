import { styled } from "styled-components";
import { useRef, useState } from "react";

import { AxiosAdmin } from "../../../servies/admin";

import * as XLSX from "xlsx";
import UploadRacers from "./components/UploadRacers";
import DataBoard from "./components/DataBoard";
import UploadCoach from "./components/UploadCoach";
import UploadTeamBuilding from "./components/UploadTeamBuilding";

export interface RowData {
  [key: string]: any;
}

const tabList = ["레이서 및 트랙 생성", "코치 멤버 등록", "프로젝트 팀빌딩"];

function AdminAddFile() {
  const [tabIdx, setTabIdx] = useState(2);

  const [track, setTrack] = useState({
    trackName: "",
    cardinalNo: "",
  });
  const [data, setData] = useState<RowData[]>([]);
  const [error, setError] = useState("");

  const handleChangeTabIndex = (idx: number) => setTabIdx(idx);

  const handleUploadTeamBuildFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await AxiosAdmin.uploadTeamBuildFile(file);
        console.log("팀 빌딩 파일 확인");
        console.log(res);
        if (res.status === 201) {
          alert("파일이 성공적으로 업로드되었습니다.");

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
        }
      } catch (error: any) {
        alert(error.response.data.message);
        console.error(error);
      }
    }
  };

  const handleCreateTrack = async () => {
    if (track.trackName === "") return alert("트랙을 선택해주세요.");
    if (track.cardinalNo === "") return alert("기수를 입력해주세요.");
    if (Number.isNaN(parseInt(track.cardinalNo))) return alert("기수에 숫자만 입력해주세요.");

    try {
      const { trackName, cardinalNo } = track;
      const res = await AxiosAdmin.createTrack({ trackName, cardinalNo });
      console.log(res);
      if (res.data?.statusCode === 200) return console.log(res.data?.message);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
      console.log(error);
    }
  };

  const handleUploadUsersFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 서버에 파일 업로드
        const res = await AxiosAdmin.uploadUserFile(file);
        if (res.status === 201) {
          alert("파일이 성공적으로 업로드되었습니다.");

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
        }
      } catch (error: any) {
        alert(error.response.data.message);
        console.error(error);
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
          {
            [
              <UploadRacers
                onChange={handleChangeTrackInfo}
                track={track}
                onCreateTrack={handleCreateTrack}
                onClear={handleClear}
                onFileUpload={handleUploadUsersFile}
                inputFileRef={inputFileRef}
              />,
              <UploadCoach />,
              <UploadTeamBuilding onFileUpload={handleUploadTeamBuildFile} inputFileRef={inputFileRef} onClear={handleClear} />,
            ][tabIdx]
          }
        </SectionWrapper>
        <SectionWrapper></SectionWrapper>
        <SectionWrapper></SectionWrapper>
        <Text style={{ paddingTop: "24px" }}>아래는 파일에서 받아온 유저정보입니다.</Text>
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
  width: 20%;
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
