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

function AdminAddFile() {
  const [tabIdx, _setTabIdx] = useState(0);

  const [track, setTrack] = useState({
    trackName: "",
    cardinalNo: "",
  });
  const [data, setData] = useState<RowData[]>([]);
  const [error, setError] = useState("");

  // const tabBtnRef = useRef(null);
  // const tabClick = (idx:number) => {
  //   if (tabIdx !== idx) {
  //     tabBtnRef?.current?[tabIdx].classList.remove("selected");
  //     tabBtnRef?.current?[idx].classList += " selected";
  //     setTabIdx(idx);
  //   }
  // };

  const handleCreateTrack = async (e: any) => {
    e.preventDefault();
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

  const handleUsersFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 서버에 파일 업로드
        const res = await AxiosAdmin.uploadUserFile(file);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <TitleWrapper>
        <Title>파일 업로드하기</Title>
      </TitleWrapper>
      <NavWrapper>
        <Item>
          <Text className="racer">레이서 및 트랙 생성</Text>
        </Item>
        <Item>
          <Text>코치 멤버 등록</Text>
        </Item>
        <Item>
          <Text>프로젝트 팀빌딩</Text>
        </Item>
      </NavWrapper>
      <SectionWrapper>
        {
          [
            <UploadRacers
              onChange={onChange}
              track={track}
              handleCreateTrack={handleCreateTrack}
              handleClear={handleClear}
              handleFileUpload={handleUsersFileUpload}
              inputFileRef={inputFileRef}
              data={data}
            />,
            <UploadCoach />,
            <UploadTeamBuilding />,
          ][tabIdx]
        }
      </SectionWrapper>
      <SectionWrapper></SectionWrapper>
      <SectionWrapper></SectionWrapper>
      <Text style={{ paddingTop: "24px" }}>아래는 파일에서 받아온 유저정보입니다.</Text>
      <DataBoard data={data} />
    </Container>
  );
}
export default AdminAddFile;

const Container = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
`;
const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: auto;
  gap: 4px;
  height: 30px;
  padding-left: 10px;
`;
const SectionWrapper = styled.div`
  &.selected {
    display: block;
  }
  &.unselected {
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  overflow: hidden;
  white-space: inherit;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 12px 12px 0 0;
`;

const Title = styled.h1``;
const Text = styled.p``;
