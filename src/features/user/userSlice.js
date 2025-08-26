import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
    isLoggedIn: false,
    userData: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;