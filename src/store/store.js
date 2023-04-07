import { configureStore, createSlice } from "@reduxjs/toolkit";

let food = createSlice({
  name: "food",
  initialState: [
    { id: 0, name: "족발", isComplete: false },
    { id: 1, name: "치킨", isComplete: false },
  ],
  reducers: {
    remove(state, action) {
      // 전달받은 payload로 삭제할 아이템의 ID를 찾음
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        // ID에 해당하는 아이템을 찾은 경우
        state.splice(index, 1); // 해당 아이템을 배열에서 삭제
      }
    },
    add(state, action) {
      state.push(action.payload);
    },
  },
});
export let { remove, add } = food.actions;

export default configureStore({
  reducer: {
    food: food.reducer,
  },
});
