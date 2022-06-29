import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import KakaoRedirect from "./pages/KakaoRedirect";
// cookies
import { getCookie } from "./shared/Cookies";

function App() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  console.log(loginState);
  const token = getCookie("token");
  useEffect(() => {
    token ? setLoginState(true) : setLoginState(false);
  }, [token]);

  // const logoutHandler = () => {
  //   deleteCookie('token');
  //   dispatch(logout());
  //   alert('로그아웃 되었습니다!');
  //   navigate('/');
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login setLoginState={setLoginState} />}
        ></Route>
        <Route
          path="/auth/kakao/callback"
          element={<KakaoRedirect />}
          setLoginState={setLoginState}
        />
      </Routes>
      <button>로그아웃</button>
    </div>
  );
}

export default App;
