import styled from "styled-components";

// type OfficehourType = "FE" | "BE" | "AI" | "ALL";

interface OfficehourData {
  id: string;
  date: string;
  coachName: string;
  team: string;
  type: string;
  time: string;
  isAlert: boolean;
}

interface CalendarProps {
  officehourDatas: OfficehourData[];
}
function Calendars({ officehourDatas }: CalendarProps) {
  const date = new Date();

  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  const viewDays = date.getDay();

  const preiod = `${viewYear}년 ${viewMonth + 1}월 ${viewDays}일 ~ ${viewMonth + 1}월 ${viewDays + 6}일`;

  return (
    <Calendar>
      <Header>
        <Title></Title>
        <Nav>
          <PrevButton>⬅️</PrevButton>
          <WeeklyPeriod>{preiod}</WeeklyPeriod>
          <NextButton>➡️</NextButton>
        </Nav>
      </Header>
      <Main>
        <DaysWrapper>
          <Day>일</Day>
          <Day>월</Day>
          <Day>화</Day>
          <Day>수</Day>
          <Day>목</Day>
          <Day>금</Day>
          <Day>토</Day>
        </DaysWrapper>
        <Dates>{officehourDatas.map(date => date.id)} </Dates>
      </Main>
    </Calendar>
  );
}

export default Calendars;

const Calendar = styled.div``;

const Header = styled.div``;

const Title = styled.div``;

const Nav = styled.div``;

const PrevButton = styled.div``;

const NextButton = styled.div``;

const WeeklyPeriod = styled.div``;

const Main = styled.div``;

const DaysWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Day = styled.div``;

const Dates = styled.div``;
