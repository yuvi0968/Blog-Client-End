import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    postData:[]
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        login: (state, action) =>{
            state.status = true;
            state.userData = action.payload.response;
        },
        logout: (state, action) =>{
            state.status = false;
            state.userData = null;
        },
        addPost: (state, action) =>{
            const newPost = {
                id: nanoid(),
                data: action.payload
            };
            state.postData.push(newPost);
        }
    }

});
export const { login, logout, addPost } = authSlice.actions

export default authSlice.reducer;