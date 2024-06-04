import React, { useState } from "react";
import * as XLSX from "xlsx";
import { postUsersFile } from "../../../servies/api";
interface RowData {
  [key: string]: any;
}

const ExcelUpload = () => {
  const [data, setData] = useState<RowData[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 서버에 파일 업로드
        await postUsersFile(file);
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
      } catch (error) {
        alert("파일 업로드 중 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls .csv" onChange={handleFileUpload} />
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
    </div>
  );
};

export default ExcelUpload;
