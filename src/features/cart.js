import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name : 'cart',
    initialState: {value : []},
    reducers : {
        updateCartArray : (state, action)=>{
            state.value.push(action.payload)
            state.value.map((obj)=>{
                obj.id === action.payload.id && (obj.single = obj.price);
            })
        },

        removeFromCartArray : (state, action)=>{
            state.value = state.value.filter((obj)=>{
                return obj.id !== action.payload
            })
        },

        updateQuantity : (state, action)=>{
            state.value.map((obj)=>{
                obj.id === action.payload.id && (action.payload.method === 'decrement' ? (obj.quantity = obj.quantity - 1,
                    obj.single = obj.quantity * obj.price
                    ) :
                     (
                        obj.quantity = obj.quantity + 1,
                        obj.single = obj.quantity * obj.price
                        ));
            })
        }
    }
});


export const {updateCartArray, removeFromCartArray, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
