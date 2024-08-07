import Calendars from "../components/calendars/Calendars";

function TestPages() {
  const officehourDatas = [
    { id: "sadfasdf", date: "1000-000-00", coachName: "김정현", team: "1팀", type: "FE", time: "22:00", isAlert: false },
    { id: "sadfasdf", date: "1000-000-00", coachName: "김정현", team: "1팀", type: "FE", time: "22:00", isAlert: false },
  ];
  return <Calendars officehourDatas={officehourDatas} />;
}

export default TestPages;
