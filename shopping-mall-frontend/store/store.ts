import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 사용자 정보 슬라이스
const userSlice = createSlice({
  name: "user",
  initialState: {
    nickname: null as string | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.nickname = action.payload;
    },
  },
});

// 액션 내보내기
export const { setUser } = userSlice.actions;

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// 타입 지정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
