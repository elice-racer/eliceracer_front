import styled from "styled-components";

interface OfficeHourDataBoard {
  onClick: () => void;
}

function OfficeHourDataBoard({ onClick }: OfficeHourDataBoard) {
  return (
    <Container>
      <Item onClick={onClick}>officehour</Item>
    </Container>
  );
}

export default OfficeHourDataBoard;

const Container = styled.div`
  border: 1px solid #dbdbdb;
`;

const Item = styled.div`
  cursor: pointer;
`;
