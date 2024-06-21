import styled from "styled-components";
import { imgPaths } from "../../../../utils/path";
interface DataBoardProps {
  data: Array<any>;
}

const DataBoard: React.FC<DataBoardProps> = ({ data }) => {
  if (!data.length)
    return (
      <Container>
        <Wrapper>
          <Img src={imgPaths.FILE_UPLOAD} alt="파일을 먼저 등록해주세요." />
        </Wrapper>
      </Container>
    );

  const headers = Object.keys(data[0]);
  return (
    <ListContainer>
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
    </ListContainer>
  );
};

export default DataBoard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;

  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const ListContainer = styled(Container)`
  border: 1px solid ${({ theme }) => theme.colors.gray1};
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
  font-size: 1.4rem;
`;

const Tbody = styled.tbody``;
const Td = styled.td`
  font-size: 1.2rem;
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
