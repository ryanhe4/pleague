// TODO 회원가입

import {createAsyncThunk} from "@reduxjs/toolkit";

const delay = (time:number, value:any) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
});

export const register = createAsyncThunk('user/register', async (data:any, thunkAPI) => {
    return delay(1000, 10);
});
