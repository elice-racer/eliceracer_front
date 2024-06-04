import styled from "styled-components";

interface DataBoardProps {
  data: Array<any>;
}

const DataBoard: React.FC<DataBoardProps> = ({ data }) => {
  if (!data.length)
    return (
      <Container>
        <Wrapper>
          <Img src="" alt="파일을 먼저 등록해주세요." />
        </Wrapper>
      </Container>
    );

  const headers = Object.keys(data[0]);
  return (
    <Container>
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
    </Container>
  );
};

export default DataBoard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 230px;
`;

/*
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
*/
