import "./App.css";
import React, { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

//데이터를 가져오는 함수
const getPostList = () => {
  return axios.get("http://localhost:5001/posts");
};

//데이터를 추가하는 함수
const addPostData = (data) => {
  return axios.post("http://localhost:5001/posts", data);
};

function App() {
  const iptRef = useRef(null);
  // 쿼리키!! ,  // 쿼리 함수!!
  const post_query = useQuery("post_list", getPostList, {
    //옵션!!
    onSuccess: (data) => {
      console.log(data);
    },
    //브라우저 화면 바깥으로 포커스가 이동했다가 돌아오면
    //무조건 API 콜 그래서 staleTime으로 시간을 주거나 해야함
  });

  //후처리하기
  const queryClient = useQueryClient();

  //useMutation 은 쿼리키 대신 함수를 바로 넣어주고 ,그다음 옵션
  const { mutate: addPost } = useMutation(addPostData, {
    onSuccess: (data) => {
      // key를 넣지 않을 경우 모든 쿼리가 무효화.
      // mutation을 성공하면 수면 데이터 목록을 불러오는 useQuery를 무효화 시켜준다!
      queryClient.invalidateQueries("post_list");
      iptRef.current.value = "";
      // 입력 영역 클리어까지 꼭 해주자
    },
  });
  // mutate는 디스패치 역할을 한다. 실행하는 트리거 역할 mutate : addPost 처럼 정해줄 수 있다.
  console.log();
  if (post_query.isLoading) {
    return null;
  }

  console.log(post_query.data.data);

  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <input ref={iptRef} />
      <button
        onClick={() => {
          // input 값은 넣어서 보내준다!
          const data = iptRef.current.value;
          addPost(data);
        }}
      >
        포스트 하기
      </button>
    </div>
  );
}

export default App;
