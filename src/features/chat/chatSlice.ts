import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  activeReceiverId: string | null;
  typing: boolean;
}

const initialState: ChatState = {
  activeReceiverId: null,
  typing: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveReceiverId(state, action: PayloadAction<string | null>) {
      state.activeReceiverId = action.payload;
    },

    setTyping(state, action: PayloadAction<boolean>) {
      state.typing = action.payload;
    },
  },
});

export const { setActiveReceiverId, setTyping } = chatSlice.actions;

export default chatSlice.reducer;
