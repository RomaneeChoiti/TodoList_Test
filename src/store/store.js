import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

//데이터를 가져올 때 기본구조
export const fetchFoodList = createAsyncThunk("GET_TODO", async () => {
  const response = await axios.get("http://localhost:4000/foodList");
  return response.data;
});

let food = createSlice({
  name: "food",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    remove(state, action) {
      // 전달받은 payload로 삭제할 아이템의 ID를 찾음
      const index = state.data.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        // ID에 해당하는 아이템을 찾은 경우
        state.data.splice(index, 1); // 해당 아이템을 배열에서 삭제
      }
    },
    add(state, action) {
      state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export let { remove, add } = food.actions;

export default food.reducer;
