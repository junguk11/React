// package
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
// hooks
import useInput from "../hooks/useInput";
import { idCheck, emailCheck, passwordCheckF } from "../hooks/useCheck";
// redux
import { __checkUserId } from "../redux/modules/userSlice";
import { useSelector, useDispatch } from "react-redux";

const registerMT = (data) => {
  return axios.post("http://13.124.63.214/user/signup", data);
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useInput("");
  const [nickname, setNicname] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  console.log(username);
  // button disable
  const disabledHandler = () => {
    if (idCheck(username) === true) return true;
    else if (password !== passwordCheck) return true;
    else if (emailCheck(email) === false) return true;
    else if (passwordCheckF(password) === false) return true;
    else if (isNaN(nickname) === false) return true;
    else if (
      username === "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname === "" ||
      email === ""
    )
      return true;
    else return false;
  };
  // id check
  const onIdCheck = () => {
    dispatch(__checkUserId(username));
  };

  const idCheckDisabled = () => {
    if (idCheck(username) === true) return true;
    if (username === "") return true;
    // 서버 리턴값 if (  === true ) return false;
    else return false;
  };

  // password
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword]
  );
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password, setPasswordCheck]
  );

  // mutate
  const { mutate } = useMutation(registerMT, {
    onSuccess: () => {
      navigate("/login");
      setSignUpSuccess(true);
    },
    onError: (error) => {
      navigate("/");
      setSignUpError(error);
    },
  });

  // submit
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log({
        username: username,
        nickname: nickname,
        email: email,
        password: password,
        passwordCheck: passwordCheck,
      });
      // if (!mismatchError) {
      //   mutate({
      //     username: username,
      //     nickname: nickname,
      //     email: email,
      //     password: password,
      //     passwordCheck: passwordCheck,
      //   });
      // }
    },
    [username, nickname, email, password, passwordCheck]
  );

  return (
    <div>
      <div id="container">
        <form onSubmit={onSubmit}>
          <label id="user-id-label">
            <span>아이디</span>
            <button onClick={onIdCheck} disabled={idCheckDisabled()}>
              중복확인
            </button>
            <div>
              <input
                type="text"
                id="user-id"
                name="user-id"
                value={username}
                onChange={setUsername}
              />
              {signUpError ? (
                <span>로그인 시 사용할 ID를 입력해주세요.</span>
              ) : (
                <span>사용가능한 ID입니다.</span>
              )}
            </div>
          </label>
          <label id="nickname-label">
            <span>닉네임</span>
            <div>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={setNicname}
              />
              {!nickname ? (
                <span>닉네임을 입력해주세요.</span>
              ) : (
                <span>사용가능한 닉네임입니다.</span>
              )}
            </div>
          </label>
          <label id="email-label">
            <span>이메일 주소</span>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={setEmail}
              />
              {emailCheck(email) ? (
                <span>사용 가능한 이메일입니다.</span>
              ) : (
                <span>올바른 이메일 형식이 아닙니다.</span>
              )}
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
                onChange={onChangePassword}
              />
              {passwordCheckF(password) ? (
                <span>사용 가능한 비밀번호 입니다.</span>
              ) : (
                <span>영문, 숫자, 특수 문자 포함 6~15자</span>
              )}
            </div>
          </label>
          <label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {mismatchError ? (
                <span>비밀번호가 일치하지 않습니다.</span>
              ) : (
                <span>비밀번호를 재입력 해주세요.</span>
              )}
            </div>

            {signUpSuccess && <span>회원가입되었습니다! 로그인해주세요.</span>}
          </label>
          <button type="submit" disabled={disabledHandler()}>
            회원가입
          </button>
        </form>
        <div>
          이미 회원이신가요?&nbsp;
          <a href="/login">로그인 하러가기</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
