import styled from "styled-components";
import CustomCalendar, { CustomCalendarProps } from "../calendar/Calendar";
import { OfficehourProps } from "../../services/officehour";

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
      typeof obj.updatedAt === "string"
    );
  }

  function isMyTypeArray(arr: any[]): arr is OfficehourProps[] {
    return arr?.every(item => isOfficehourType(item));
  }

  const convertCalendarType = (arr: OfficehourProps[]): CustomCalendarProps[] => {
    if (isMyTypeArray(arr)) {
      const newEvents = arr.map(item => {
        const newEvent: CustomCalendarProps = {
          title: ` ${item.type} `,
          desc: `${item.coach}코치님`,
          start: new Date(item.date),
          end: new Date(item.date),
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
        <CustomCalendar events={convertCalendarType(_officeHours)} />
        {/* <DataWrapper>{officehours ? "" : <EmptyImage message={"현재 등록된 전체 오피스아워 일정이 없습니다."} />}</DataWrapper> */}
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

// const DataWrapper = styled.div`
//   margin: 6px 0;
//   width: 100%;
//   height: 230px;
//   display: flex;
//   justify-content: center;
//   border: 1px solid ${({ theme }) => theme.colors.gray1};

//   cursor: pointer;
//   &:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const Text = styled.p`
//   &.info {
//     color: ${({ theme }) => theme.colors.gray2};
//   }
// `;
