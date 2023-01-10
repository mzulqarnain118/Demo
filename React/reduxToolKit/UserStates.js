import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { MakeApiCall } from '../api/MakeApiCall';



export const getUserDetails = createAsyncThunk(
    'test/getUserDetails',
    async () => {
        let url = `/user/${localStorage.getItem("user_id")}`;
        const response = await MakeApiCall(url, null, localStorage.getItem('token'), 'GET');        
        return response;
    }
);



export const userStates = createSlice({
    name: 'user',
    initialState: {
        is_loading: false,
        userDetails:[]
    },
    reducers: {
        is_loading: (state,data) => {
            state.is_loading =data.payload
            console.log("data of store \t", data)
        },

    },
    extraReducers: {
        [getUserDetails.pending]: (state, action) => {
            state.is_loading = false;
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.is_loading =true;
            //  console.log("getUserDetails",action.payload.data);
            state.userDetails = action.payload.data;
        },
        [getUserDetails.rejected]: (state, action) => {
            state.is_loading = false;
            state.error = action.error.message;
        },
    }
})


// Action creators are generated for each case reducer function
export const {
   is_loading,
} = userStates.actions

export default userStates.reducer