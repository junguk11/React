import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __checkUserId = createAsyncThunk(
  "user/CHECKID",
  async (payload, thunkAPI) => {
    const response = await axios.get(`/user/userid/${payload}`);
    // 중복확인 결과에 따라 alert 후 상태 저장
    if (!response.data.result) alert("동일한 아이디가 존재합니다");
    return response.data.result;
  }
);

/* Reducer */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    CheckedId: false,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    changeCheckId: (state, payload) => {
      state.checkName = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__checkUserId.fulfilled, (state, action) => {
      state.CheckedId = action.payload;
    });
  },
});

export const { changeCheckId } = userSlice.actions;
export default userSlice.reducer;
