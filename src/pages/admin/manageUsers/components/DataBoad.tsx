// components/DataBoard.tsx
import styled from "styled-components";

interface DataBoardProps {
  data: Array<any>;
}

const DataBoard: React.FC<DataBoardProps> = ({ data }) => {
  if (!data.length) return <div>No data available</div>;

  const headers = Object.keys(data[0]);
  return (
    <Table>
      <Thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </Thead>
      <Tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header, idx2) => (
              <Td key={idx2}>{row[header]}</Td>
            ))}
          </tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataBoard;

const Table = styled.table`
  margin: 0 auto;
  text-align: center;
  border: 1px solid #eee;
  border-spacing: 15px;
  background-color: rgba(0, 0, 0, 0.015);
  border-radius: 9px;
`;
const Thead = styled.thead`
  font-size: 1.4em;
`;
const Tbody = styled.tbody``;
const Td = styled.td`
  font-size: 1.2em;
  border-bottom: 1px solid #eee;
`;
