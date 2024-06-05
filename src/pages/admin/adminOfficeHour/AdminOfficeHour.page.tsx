import AdminAddOfficeHour from "./components/AdminAddOfficeHour";
import AdminUpdateOfficeHour from "./components/AdminUpdateOfficeHour";
import OfficeHourDataBoard from "./components/OfficeHourDataBoard";

function AdminOfficeHour() {
  return (
    <div>
      <AdminAddOfficeHour />
      <AdminUpdateOfficeHour />
      <OfficeHourDataBoard />
    </div>
  );
}

export default AdminOfficeHour;
