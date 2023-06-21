import { useDispatch, useSelector } from "react-redux";
import { removeFromCartArray, updateQuantity } from "../features/cart";

export const Quantity = (props)=>{
    const dispatch = useDispatch();
    const cartSel = useSelector((state)=>state.cart.value);

    const remove = (id)=>{
        dispatch(removeFromCartArray(id));
    }

    const alt = (id, method)=>{
        cartSel.map((obj)=>{
            obj.id === id && ((method === 'decrement' && obj.quantity === 1) ? remove(id) : dispatch(updateQuantity({id , method}))); 
        });
    }
    

    return  <div className="quantity_container d-flex">
        <button className="minus_btn hovr" onClick={()=>{alt(props.element.asin , 'decrement')}}><b>-</b></button>
        <span className="quantity">{
            cartSel.map((obj)=>{
                return (obj.id === props.element.asin) && obj.quantity;
            })
            }
        </span>
        <button className="plus_btn hovr" onClick={()=>{alt(props.element.asin , 'increment')}}><b>+</b></button>
        </div>;
}