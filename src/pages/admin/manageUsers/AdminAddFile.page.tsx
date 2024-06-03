import { styled } from "styled-components";
import GetUsers from "./components/GetUsers";
import { postUsersFile } from "../../../servies/admin";
import { useRef, useState } from "react";
import { postExcelFile } from "../../../servies/api";
import { readExcelFile, getExtensionOfFilename, workbookToJsonArray } from "../../../utils/exelUtils";
import DataBoard from "./components/DataBoad";
interface DataBoardProps {
  data: Array<any>;
}
function AdminAddFile() {
  const [file, setFile] = useState<File | null>(null);

  const handleUploadFile = async (e: any) => {
    const { file } = e.target;
    if (!file) return alert("파일을 등록해주세요.");
    const res = await postExcelFile(file);
    console.log(res);
    return res;
  };

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && getExtensionOfFilename(file)) {
      readExcelFile(file, (workbook: any) => {
        const jsonData = workbookToJsonArray(workbook);
        setData(jsonData);
      });
    } else {
      alert(".xlsx 파일을 등록해주세요.");
    }
  };

  const handleClear = (): void => {
    if (inputFileRef.current) inputFileRef.current.value = "";
    setData([]);
  };

  return (
    <Container>
      <Title>유저 정보 등록하기</Title>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <button onClick={handleClear}>Clear</button>
      <Label>
        <Input type="file" accept=".xlsx, .xls, .csv" onChange={handleUpload} ref={inputFileRef} />
      </Label>
      <Text>아래는 파일에서 받아온 유저정보입니다.</Text>
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
