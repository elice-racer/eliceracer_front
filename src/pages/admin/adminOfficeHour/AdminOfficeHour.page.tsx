import styled from "styled-components";
import OfficeHourDataBoard from "./components/OfficeHourDataBoard";
import OfficehourUpdateMoal from "./components/OfficehourUpdateMoal";
import { useState } from "react";

export interface OfficehourData {
  id: string;
  coachName: string;
  time: string;
  date: string;
}

function AdminOfficeHour() {
  /** 수정할 오피스아워 정보 */
  const [officehourInfo, setOfficehourInfo] = useState<OfficehourData>({
    id: "저장된 데이터가 없습니다.",
    coachName: "등록된 코치가 없습니다.",
    time: "예정된 시간이 없습니다.",
    date: "예정된 날짜가 없습니다.",
  });
  const [isOepn, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateOfficehour = () => {
    // 수정을 마치겠습니까? alert 모달 띄우기
    setIsLoading(true);
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleChangeOfficehourInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOfficehourInfo(updatedInfo => ({ ...updatedInfo, [name]: value }));
  };

  return (
    <Container>
      <OfficehourUpdateMoal
        isOpen={isOepn}
        isLoading={isLoading}
        value={officehourInfo}
        onClick={handleUpdateOfficehour}
        onChange={handleChangeOfficehourInfo}
        onClose={() => setIsOpen(false)}
      />
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
