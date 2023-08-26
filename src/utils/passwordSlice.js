import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: 'passwordList',
  initialState: { list: [] },
  reducers: {
    updateList: (state, action) => {
      console.log('reducer',action.payload);
      state.list = action.payload
    }
  }
})

export const { updateList } = passwordSlice.actions
export default passwordSlice.reducer