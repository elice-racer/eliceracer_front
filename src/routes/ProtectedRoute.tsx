import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../recoil/TokenAtom";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "../utils/path";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const curruntLocation = useLocation();

  return isLogin ? <>{element} </> : <Navigate to={paths.LOGIN} replace state={{ redirectedFrom: curruntLocation }} />;
};

//location.replace('보낼 라우터')
// 브라우저가 제공하는 location api 메서드로 새로운 히스토리 스택을 쌓지 않고 현재 스택을 대체함
// Replace옵션은 이 location.replace를 직접 조작하는 것과 같은 효과를 내는 react-router의 옵션이다.
// 현재 위치한 스택을 이동하고자하는 페이지(스택?)에 대체 시킨다.

// 브라우저 History 객체
// history 객체의 state항목을 담아주면 지나왔던 페이지의 스택을 확인할 수 있다.
