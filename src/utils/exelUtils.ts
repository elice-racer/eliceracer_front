import XLSX from "xlsx";

interface WorkBookCallBack {
  (workbook: XLSX.WorkBook): void;
}

// Fixes binary data to string
const fixData = (data: ArrayBuffer) => {
  let o = "";
  let l = 0;
  const w = 10240;
  const dataUint8 = new Uint8Array(data);
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, Array.from(dataUint8.slice(l * w, l * w + w)));
  }
  o += String.fromCharCode.apply(null, Array.from(dataUint8.slice(l * w)));
  return o;
};

// Reads the Excel file
export const readExcelFile = (file: File, callback: WorkBookCallBack) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = e => {
    const data = e.target?.result as ArrayBuffer;
    const arr = fixData(data);
    const workbook = XLSX.read(btoa(arr), { type: "base64" });
    callback(workbook);
  };
};

// Checks if the file is an Excel file
export const getExtensionOfFilename = (file: File) => {
  const filename = file.name;
  const _lastDot = filename.lastIndexOf(".");
  const _fileExt = filename.substring(_lastDot).toLowerCase();
  return _fileExt === ".xlsx";
};

// Converts workbook to JSON
export const workbookToJsonArray = (workbook: XLSX.WorkBook): any[] => {
  const result: any[] = [];
  workbook.SheetNames.forEach((sheetName: any) => {
    const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (roa.length) result.push(roa);
  });
  return result[0];
};
