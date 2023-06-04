import { product_details } from "../rawdata/data";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromCartArray } from "../features/cart";
import { Quantity } from "../components/quantity";

export const Cart = ()=>{
    const cartSel = useSelector((state)=>state.cart.value);
    const dispatch = useDispatch();
    var cartTotal = 0;

    const remove = (asin)=>{
        dispatch(removeFromCartArray(asin));
    }

    const Item = (props)=>{
        return <div className="items_container">
                    <div className="item_img_container"><img className="cart_image" src={props.element.image} width={280} height={160} alt=''/></div>
                    <div className="item_mid_container"><div><div className="item_title">{props.element.title}</div><h6 className='text-success fw-bold'>In stock</h6></div>
                    <div className="d-flex"><Quantity element = {props.element}/>
                    <span>|</span><span onClick={()=>{remove(props.element.asin)}} className="remove_item"> Remove this product </span></div>
                    </div>
                    <div className="item_price text-dark fw-bold"><h5><b>Price</b></h5>&#8377;
                    {
                        cartSel.map((obj)=>{
                            if(obj.id === props.element.asin){
                                return (obj.single).toLocaleString('ta-IN')
                            }
                        })
                    }</div>
                </div>;
    }

    return <div className="cart_master_container">
        {   
            (cartSel.length === 0) ? <h2>You have no items in your cart!</h2> :
            product_details.map((product)=>{
                return cartSel.map((obj)=>{
                    return obj.id === product.asin && <Item element={product} key={product.asin}/>
                })
            })
        } 
        {(cartSel.length !== 0) && <div className="total_cost_container">
            <h2>Total cart value : &#8377; {
            (cartSel.map((obj)=>{
                cartTotal += obj.single;
            }),cartTotal.toLocaleString('ta-IN'))
            }</h2>
        <button className="checkout_button">CHECKOUT</button></div>
        }
    </div>
}
