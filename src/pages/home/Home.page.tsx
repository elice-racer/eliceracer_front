import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginSelector, tokenAtom } from "../../store/TokenAtom";
import { useRecoilValue } from "recoil";

function Home() {
  const navigate = useNavigate();

  const user = useRecoilValue(tokenAtom);
  const isLogin = useRecoilValue(isLoginSelector);
  useEffect(() => {
    if (isLogin) return;
    else {
      navigate("/login");
    }
  }, []);
  // user 정보
  return <div>Home.page</div>;
}

export default Home;
