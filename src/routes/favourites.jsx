import { product_details } from "../rawdata/data";
import { useDispatch, useSelector} from "react-redux";
import { removeFromFavArray } from "../features/favourite";
import { updateCartArray } from "../features/cart";
import { useContext } from "react";
import { AppContext } from "../App";

export const Favourites = ()=>{
    const context = useContext(AppContext);
    const favSel = useSelector((state)=>state.favourite.value);
    const cartSel = useSelector((state)=> state.cart.value);
    const imageW = context.favtResizer;
    const buttonW = context.favtButtonsResizer;
    const dispatch = useDispatch();
    
    const cart = (asin, price)=>{
        dispatch(updateCartArray({ 'id' : asin, 'quantity' : 1, price }));
    }

    const removeFavourite = (event)=>{
        dispatch(removeFromFavArray(event.target.id));
    }

    const Favt = (props)=>{
        return <div className="favt_container">
                    <div className="favt_img_container"><img className="favt_image" src={props.element.image} width={imageW ? 240 : 290} height={imageW ? 130 : 155} alt=''/></div>
                    <div className="mid_container"><div className="favt_title">{props.element.title}</div>
                    <div className="favt_price pt-2 text-dark fs-5">&#8377;{props.element.price}</div></div>
                    <div className="cart_favt_container">
                    <button className={"addfavt_tocart " + (buttonW && (cartSel.some((obj)=>obj.id === props.element.asin) ? "bi-cart-check" : "bi-cart-plus"))} id={props.element.asin}
                        onClick={()=>{cart(props.element.asin , parseInt((props.element.price).replace(',','')))}}
                        disabled={cartSel.some((obj)=>obj.id === props.element.asin)}>{
                            !buttonW && (cartSel.some((obj)=>obj.id === props.element.asin)? 'Item added to cart' : 'Add item to cart')
                        }
                    </button> 
                    <button className={"remove_favt " + (buttonW && "bi-trash")} id={props.element.asin} onClick={removeFavourite}>{!buttonW && "Remove favourite"}</button>
                    </div>
                </div>;
    }

    return <div className="favt_master_container" style={ favSel.length !== 0 ? {paddingTop : '95px'} : {justifyContent: 'center'}}>
        {   
            (favSel.length === 0) ? <h2>You have not saved any favourites!</h2> :
            favSel.map((id)=>{
            return product_details.filter((product)=>{ 
               return id === product.asin;
            }).map((product)=><Favt element={product} key={id}/>)
        })
        }  
    </div>
}