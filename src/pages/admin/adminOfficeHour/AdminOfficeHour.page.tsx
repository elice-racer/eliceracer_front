import styled from "styled-components";
import OfficeHourDataBoard from "./components/OfficeHourDataBoard";
import OfficehourUpdateMoal from "./components/OfficehourUpdateMoal";
import { useState } from "react";

function AdminOfficeHour() {
  const [isOepn, setIsOpen] = useState(false);
  return (
    <Container>
      <OfficehourUpdateMoal isOpen={isOepn} value={"준비중"} onClick={() => setIsOpen(false)} onChange={() => {}} onClose={() => setIsOpen(false)} />
      <InputWrapper>
        <SearchInput type="text" placeholder="'AI8 3차' 형태로 입력해주세요." />
      </InputWrapper>
      <OfficeHourWrapper>
        <ControllBarWrapper>
          <ControllBtn>⬅️</ControllBtn>
          <ControllBtn>➡️</ControllBtn>
        </ControllBarWrapper>
        <OfficeHourDataBoard onClick={() => setIsOpen(true)} />
      </OfficeHourWrapper>
    </Container>
  );
}

export default AdminOfficeHour;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  padding: 12px 0;
`;
const SearchInput = styled.input`
  width: 200px;
`;

const OfficeHourWrapper = styled.div`
  width: 80%;
  border-radius: 12px;
  border: solid 1px #dbdbdb;
  padding: 12px;
`;

const ControllBarWrapper = styled.div`
  display: flex;
  gap: 4px;
  justify-content: end;
`;

const ControllBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 2px;
  border: solid 1px #dbdbdb;
  cursor: pointer;
`;
