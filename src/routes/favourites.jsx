import { product_details } from "../rawdata/data";
import { useDispatch, useSelector} from "react-redux";
import { removeFromFavArray } from "../features/favourite";
import { updateCartArray } from "../features/cart";

export const Favourites = ()=>{
    const favSel = useSelector((state)=>state.favourite.value);
    const cartSel = useSelector((state)=> state.cart.value);
    const dispatch = useDispatch();
    
    const cart = (asin, price)=>{
        dispatch(updateCartArray({ 'id' : asin, 'quantity' : 1, price }));
    }

    const removeFavourite = (event)=>{
        dispatch(removeFromFavArray(event.target.id));
    }

    const Favt = (props)=>{
        return <div className="favt_container">
                    <div className="favt_img_container"><img className="image" src={props.element.image} width={200} height={120} alt=''/></div>
                    <div className="mid_container"><div className="favt_title">{props.element.title}</div>
                    <div className="favt_price pt-2 text-dark">&#8377;{props.element.price}</div></div>
                    <div className="cart_favt_container">
                    <button className="addfavt_tocart" id={props.element.asin} onClick={()=>{cart(props.element.asin , parseInt((props.element.price).replace(',','')))}} disabled={cartSel.some((obj)=>obj.id === props.element.asin)}>{cartSel.some((obj)=>obj.id === props.element.asin)? 'Item already in cart' : 'Add item to cart'}</button>
                    <button className="remove_favt" id={props.element.asin} onClick={removeFavourite}>Remove favourite</button>
                    </div>
                </div>;
    }

    return <div className="favt_master_container">
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