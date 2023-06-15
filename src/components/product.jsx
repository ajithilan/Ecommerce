import { useDispatch } from "react-redux";
import { updateFavArray } from "../features/favourite";
import { useSelector } from "react-redux";
import { updateCartArray } from "../features/cart";

export const Product = (props)=>{
    const dispatch = useDispatch();
    const favSel = useSelector((state)=>state.favourite.value);
    const cartSel = useSelector((state)=>state.cart.value);

    const favourite = (asin)=>{
        dispatch(updateFavArray(asin));
    }

    const cart = (asin , price)=>{
        dispatch(updateCartArray({'id' : asin , 'quantity' : 1 , price}));
    }

return <div className="products" id={props.element.asin} data-category = {props.element.catergory}>
        <div className="image_container "><img className="image" width='115%' height='100%' src={props.element.image} alt=''/></div>
        <div className="product_bottom_container"><div className="product_title mb-1">{props.element.title}</div>
        <div className="product_price ps-4">&#8377;{props.element.price}</div>
        <div className='cart_fav'><button className="add_to_cart fw-bold" onClick={()=>{cart(props.element.asin , parseInt((props.element.price).replace(',','')))}} disabled={cartSel.some((obj)=>obj.id === props.element.asin)}>{cartSel.some((obj)=>obj.id === props.element.asin) ? 'Added to cart' : 'Add to cart'}</button>
        <span className={'favourite '+ (favSel.includes(props.element.asin) ? 'bi-heart-fill' : 'bi-heart')} onClick={()=>{favourite(props.element.asin)}}></span></div></div>
     </div>;
}

// width={450} height={245}