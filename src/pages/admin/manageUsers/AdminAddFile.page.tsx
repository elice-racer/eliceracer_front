import { styled } from "styled-components";
import { useRef, useState } from "react";

import { AxiosAdmin } from "../../../servies/admin";

import * as XLSX from "xlsx";

// components
import SelectBox from "./components/SelectBox";
import DataBoard from "./components/DataBoard";

interface RowData {
  [key: string]: any;
}

const OPTIONS = [
  { value: "", name: "트랙을 선택해주세요." },
  { value: "ai", name: "AI" },
  { value: "cloud", name: "CLOUD" },
  { value: "sw", name: "SW" },
];

function AdminAddFile() {
  const [track, setTrack] = useState({
    trackName: "",
    cardinalNo: "",
  });
  const [data, setData] = useState<RowData[]>([]);
  const [error, setError] = useState("");

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Title>트랙 생성하기</Title>
      <Wrapper>
        <SelectBox options={OPTIONS} name="trackName" value={track.trackName} onChange={onChange} />
        <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
      </Wrapper>
      <CreateTrackBtn onClick={handleCreateTrack}>트랙 생성하기</CreateTrackBtn>
      <Title>유저 정보 등록하기</Title>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <button onClick={handleClear}>Clear</button>
      <Label>
        <Input type="file" accept=".xlsx, .xls .csv" onChange={handleFileUpload} ref={inputFileRef} />
      </Label>
      <Text>아래는 파일에서 받아온 유저정보입니다.</Text>
      <DataBoard data={data} />
    </Container>
  );
}
export default AdminAddFile;

const Container = styled.div`
  width: 100dvw;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Text = styled.p``;

const Label = styled.label``;
const Input = styled.input``;

const CreateTrackBtn = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.puple1};
  color: ${({ theme }) => theme.colors.gray2};
`;
