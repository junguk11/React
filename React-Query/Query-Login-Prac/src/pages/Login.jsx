// package
import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
// hooks
import useInput from "../hooks/useInput";
// kakao
import { KAKAO_AUTH_URL } from "../shared/Kakao";
// cookies
import { setCookie } from "../shared/Cookies";

const loginMT = (data) => {
  return axios.post("http://13.124.63.214/login", data);
};

const Login = ({ setLoginState }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");

  // mutate
  const { mutate } = useMutation(loginMT, {
    onSuccess: (res) => {
      console.log(res);
      //   setCookie("token", res.data.token, {
      //     path: "/",
      //     expire: "after60m",
      //   });
      //   setCookie("username", res.data.username, {
      //     path: "/",
      //     expire: "after60m",
      //   });
      //   setCookie("nickname", res.data.nickname, {
      //     path: "/",
      //     expire: "after60m",
      //   });
      //   navigate("/");
      setLoginState(true);
    },
    onError: (error) => {
      navigate("/login");
      setLoginState(false);
    },
  });

  // submit
  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ username, password });
    },
    [username, password]
  );

  return (
    <div>
      <form onSubmit={onLogin}>
        <label id="user-id-label">
          <span>아이디</span>
          <div>
            <input
              type="text"
              id="user-id"
              name="user-id"
              value={username}
              onChange={setUsername}
              placeholder="로그인 시 사용할 ID를 입력해주세요."
            />
          </div>
        </label>
        <label id="password-label">
          <span>비밀번호</span>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={username === "" || password === "" ? true : false}
        >
          로그인
        </button>
      </form>
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
    </div>
  );
};

export default Login;
