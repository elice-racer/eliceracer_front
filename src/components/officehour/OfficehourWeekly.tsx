import styled from "styled-components";
import CustomCalendar, { CustomCalendarProps } from "../calendar/Calendar";
import { OfficehourProps } from "../../services/officehour";
import EmptyImage from "../commons/EmptyImage";

interface OfficeHourWeeklyProps {
  officehours: OfficehourProps[];
}
function OfficeHourWeekly({ officehours }: OfficeHourWeeklyProps) {
  const _officeHours = officehours;

  function isOfficehourType(obj: any): obj is OfficehourProps {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.id === "string" &&
      typeof obj.coach === "string" &&
      typeof obj.createdAt === "string" &&
      typeof obj.type === "string" &&
      typeof obj.updatedAt === "string" &&
      typeof obj.team.teamNumber === "number"
    );
  }

  function isMyTypeArray(arr: any[]): arr is OfficehourProps[] {
    return arr?.every(item => isOfficehourType(item));
  }

  const convertCalendarType = (arr: OfficehourProps[]): CustomCalendarProps[] => {
    if (isMyTypeArray(arr)) {
      const newEvents = arr.map(item => {
        // Date 객체로 변환
        const date = new Date(item.date);

        // 9시간 빼기
        date.setHours(date.getHours() - 9);
        const newEvent: CustomCalendarProps = {
          title: `${item.team.teamNumber}팀 ${item.type} `,
          desc: `${item.coach}코치님`,
          start: date,
          end: date,
        };

        return newEvent;
      });
      return newEvents;
    }
    return [];
  };
  return (
    <Container>
      <Wapper>
        <TitleWrapper>
          <Title>전체 오피스아워 일정 📆</Title>
        </TitleWrapper>

        {officehours ? (
          <CustomCalendar events={convertCalendarType(_officeHours)} />
        ) : (
          <EmptyImage message={"현재 등록된 전체 오피스아워 일정이 없습니다."} />
        )}
      </Wapper>
    </Container>
  );
}

export default OfficeHourWeekly;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: ${({ theme }) => theme.colors.purple1};

  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 1.3em;
`;
