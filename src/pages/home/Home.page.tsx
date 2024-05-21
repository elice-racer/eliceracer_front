import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginSelector, tokenAtom } from "../../recoil/TokenAtom";
import { useRecoilValue } from "recoil";
import { paths } from "../../utils/path";

function Home() {
  const navigate = useNavigate();

  const user = useRecoilValue(tokenAtom);
  const isLogin = useRecoilValue(isLoginSelector);
  useEffect(() => {
    if (isLogin) return;
    else {
      navigate(paths.LOGIN);
    }
  }, []);
  // user 정보
  return <div>home</div>;
}

export default Home;
