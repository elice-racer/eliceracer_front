import { useEffect, useState } from "react";
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
  const storageDate = localStorage.getItem("date");
  const initDate = storageDate ? new Date(storageDate) : new Date();
  const [currentDate, setCurrentDate] = useState<Date>(initDate);

  const calculateWeeks = (date: Date): Date[] => {
    const week = [];

    const startOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const formatterDate = (date: Date): string => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    function getTextFromDate(date: Date) {
      const viewYear = date.getFullYear() - 2000;
      const viewMonth = date.getMonth() + 1;
      const viewDate = date.getDate();

      return `${viewYear}년 ${viewMonth}월 ${viewDate}일`;
    }

    const startDayStr = getTextFromDate(startOfWeek);
    const endDayStr = getTextFromDate(endOfWeek);
    return `${startDayStr} ~ ${endDayStr}`;
  };

  const weekDates = calculateWeeks(currentDate);

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    localStorage.setItem("date", currentDate.toDateString());
  }, [currentDate]);

  return (
    <Calendar>
      <Header>
        <Title>
          AI 8기 오피스아워
          <br />
          수정할 일정을 클릭해주세요!
        </Title>
        <Nav>
          <Button className="prev" onClick={goToPrevWeek} />
          <WeeklyPeriod>{formatterDate(currentDate)}</WeeklyPeriod>
          <Button onClick={goToNextWeek} />
          <BackToThisWeek onClick={() => setCurrentDate(new Date())}>☀️</BackToThisWeek>
        </Nav>
      </Header>
      <Main>
        <DaysWrapper>
          {weekDates.map((date, index) => (
            <DailysWrapper>
              <Day> {DAY_OF_THE_WEEK[index]["ko"]} </Day>
              <Dates> {date.getDate()}</Dates>
              {/* `
              // 0. 시간순으로 정렬한다 오피스 아워 날짜.
              // 1. 오피스 아워 날짜가 이번주에 포함되는지 확인
              // 2. 포함이 안되면 return;
              // 3. 포함이 된다면 무슨요일인지 구한다.
              // 4. 구해서 현재요일이랑 같으면 렌더링 시킨다.
              ` */}
              <DayBar>
                FE 1팀 19:00 <br />
                김정현 코치님
              </DayBar>
            </DailysWrapper>
          ))}
        </DaysWrapper>

        <DaysWrapper>{officehourDatas.map(date => date.id)} </DaysWrapper>
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
  align-items: center;
`;

const Title = styled.div``;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const DayBar = styled.div`
  flex: 1 0 auto;
  text-align: center;
  justify-content: center;
  margin: 2px;

  background-color: #fff;

  padding: 4px;

  font-size: 10px;
  width: 100%;
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

const BackToThisWeek = styled.div`
  cursor: pointer;
`;

const WeeklyPeriod = styled.div``;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Day = styled.div`
  flex: 1 0 auto;
  text-align: center;
  justify-content: center;
  margin: 2px;
`;

const Dates = styled.div`
  flex: 1 0 auto;
  text-align: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const DailysWrapper = styled.div`
  width: calc(94% / 7);
  margin: 2px;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.gray1};
  min-height: 260px;
`;
