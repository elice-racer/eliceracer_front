import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LogIn() {
  const navigate = useNavigate();

  const [userLoginForm, setUserLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginForm(userInfo => ({ ...userInfo, [name]: value }));
  };

  // const handleLogin = e => {
  //   e.preventDefault();
  // };

  return (
    <div>
      <input onChange={onChange} name="identifier" value={userLoginForm.identifier} placeholder="id" type="id" required />
      <input onChange={onChange} name="password" value={userLoginForm.password} placeholder="password" type="password" required />
      {/* <button onClick={handleLogin}></button> */}
    </div>
  );
}

export default LogIn;
