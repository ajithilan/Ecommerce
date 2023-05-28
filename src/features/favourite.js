import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
    name : 'favourite',
    initialState : {value : []},
    reducers : {
        updateFavArray : (state, action) => {
            (state.value).includes(action.payload) ? state.value = state.value.filter((el)=>{ return el !== action.payload}) : state.value.push(action.payload);
        },

        removeFromFavArray : (state, action) =>{
            state.value = state.value.filter((element)=>{
                return element !== action.payload;
            })
        }
    }
})

export const {updateFavArray, removeFromFavArray} = favSlice.actions;
export default favSlice.reducer;