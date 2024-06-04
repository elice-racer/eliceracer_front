import { styled } from "styled-components";
import GetUsers from "./components/GetUsers";
import { useRef, useState } from "react";

import { AxiosAdmin } from "../../../servies/admin";
import DataBoard from "./components/DataBoad";
import * as XLSX from "xlsx";
import SelectBox from "./components/SelectBox";

interface RowData {
  [key: string]: any;
}

const OPTIONS = [
  { value: "ai", name: "AI" },
  { value: "cloud", name: "CLOUD" },
  { value: "sw", name: "SW" },
];

function AdminAddFile() {
  const [data, setData] = useState<RowData[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 서버에 파일 업로드
        const res = await AxiosAdmin.uploadUserFile(file);

        console.log(res);

        if (res.status === 200) {
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

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClear = (): void => {
    if (inputFileRef.current) inputFileRef.current.value = "";
    setData([]);
  };

  return (
    <Container>
      <Title>트랙 생성하기</Title>
      <SelectBox options={OPTIONS} />
      <Input type="text" />
      <Title>유저 정보 등록하기</Title>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <button onClick={handleClear}>Clear</button>
      <Label>
        <Input type="file" accept=".xlsx, .xls .csv" onChange={handleFileUpload} ref={inputFileRef} />
      </Label>
      <Text>아래는 파일에서 받아온 유저정보입니다.</Text>
      <table>
        <thead>
          <tr>{data.length > 0 && Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((item, i) => (
                <td key={i}>{String(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <DataBoard data={data} />
      <GetUsers />
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

const Text = styled.p``;

const Label = styled.label``;
const Input = styled.input``;
