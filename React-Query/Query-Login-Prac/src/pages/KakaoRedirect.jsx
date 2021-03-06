//KakaoRedirect.js
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCookie } from "../shared/Cookies";

import axios from "axios";

const KakaoRedirect = ({ setLoginState }) => {
  const navigate = useNavigate;

  let code = new URL(window.location.href).searchParams.get("code");

  const kakaoQR = () => {
    return axios.get(`/user/kakao/callback/${code}`);
  };

  const kakao_query = useQuery("kakao_login", kakaoQR, {
    onSuccess: (data) => {
      console.log("성공했어!", data);
      navigate("/");
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
      // navigate("/");
      setLoginState(true);
    },
    onError: (error) => {
      console.log("실패");
      navigate("/");
      setLoginState(false);
    },
  });

  React.useEffect(() => {});

  //   const { mutate } = useMutation(kakaoMT, {
  //     onSuccess: (res) => {
  //       console.log(res);
  //       //   setCookie("token", res.data.token, {
  //       //     path: "/",
  //       //     expire: "after60m",
  //       //   });
  //       //   setCookie("userId", res.data.userId, {
  //       //     path: "/",
  //       //     expire: "after60m",
  //       //   });
  //       //   setCookie("nickname", res.data.nickname, {
  //       //     path: "/",
  //       //     expire: "after60m",
  //       //   });
  //       navigate("/");
  //       setLoginState(true);
  //     },
  //     onError: (error) => {
  //       navigate("/login");
  //       setLoginState(false);
  //     },
  //   });

  //   React.useEffect(async () => {
  //     await mutate(code);
  //     console.log(code);
  //     navigate("/");
  //   }, []);

  return (
    <div>
      <div>
        <span>잠시만 기다려 주세요! 로그인 중입니다.</span>
      </div>
    </div>
  );
};

export default KakaoRedirect;
