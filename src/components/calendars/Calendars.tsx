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

const DAY_OF_THE_WEEK = [
  { id: "Sun", ko: "일" },
  { id: "Mon", ko: "월" },
  { id: "Tue", ko: "화" },
  { id: "Wed", ko: "수" },
  { id: "Thu", ko: "목" },
  { id: "Fri", ko: "금" },
  { id: "Sat", ko: "토" },
];

function Calendars({ officehourDatas }: CalendarProps) {
  const date = new Date();
  console.log("------date 확인------");
  console.log(date);
  console.log("------date 확인------");
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  const viewDays = date.getDay();

  const preiod = `${viewYear}년 ${viewMonth + 1}월 ${viewDays}일 ~ ${viewMonth + 1}월 ${viewDays + 6}일`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const PrevDates = [];

  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      PrevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = PrevDates.concat(thisDates, nextDates);

  return (
    <Calendar>
      <Header>
        <Title>
          AI 8기 오피스아워
          <br />
          수정할 일정을 클릭해주세요!
        </Title>
        <Nav>
          <Button className="prev" onClick={() => {}} />
          <WeeklyPeriod>{preiod}</WeeklyPeriod>
          <Button onClick={() => {}} />
        </Nav>
      </Header>
      <Main>
        <DaysWrapper>
          {DAY_OF_THE_WEEK.map(i => (
            <Day key={i.id}>{i.ko}</Day>
          ))}
        </DaysWrapper>
        <DaysWrapper>
          {dates.map(i => (
            <DailysWrapper>
              <Day>{i}</Day>
            </DailysWrapper>
          ))}
        </DaysWrapper>

        <DatesWrapper>{officehourDatas.map(date => date.id)} </DatesWrapper>
      </Main>
    </Calendar>
  );
}

export default Calendars;

const Calendar = styled.div`
  max-width: 600px;
  margin: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div``;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.div`
  &.prev {
    border-left: 16px solid transparent;
    border-right: 16px solid ${({ theme }) => theme.colors.purple3};
  }
  cursor: pointer;
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
  border-left: 16px solid ${({ theme }) => theme.colors.purple3};
  border-right: 16px solid transparent;
`;

const WeeklyPeriod = styled.div``;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Day = styled.div`
  flex: 1 0 auto;
  text-align: center;
  justify-content: center;
`;

const DatesWrapper = styled.div``;

const DailysWrapper = styled.div``;
