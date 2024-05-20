import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../store/TokenAtom";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const curruntLocation = useLocation();
  if (isLogin) return;
  else {
    navigate("/login");
  }
  return isLogin ? <Outlet /> : <Navigate to={"/login"} replace state={{ redirectedFrom: curruntLocation }} />;
};

//location.replace('보낼 라우터')
// 브라우저가 제공하는 location api 메서드로 새로운 히스토리 스택을 쌓지 않고 현재 스택을 대체함
// Replace옵션은 이 location.replace를 직접 조작하는 것과 같은 효과를 내는 react-router의 옵션이다.
// 현재 위치한 스택을 이동하고자하는 페이지(스택?)에 대체 시킨다.

// 브라우저 History 객체
// history 객체의 state항목을 담아주면 지나왔던 페이지의 스택을 확인할 수 있다.
