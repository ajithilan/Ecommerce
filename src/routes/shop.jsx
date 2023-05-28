import {useContext} from 'react';
import { Product } from "../components/product";
import { product_details} from "../rawdata/data"; 
import { AppContext } from '../App';

export const Shop = ()=>{
    const context = useContext(AppContext);

return <div className = 'master_container'>
    <div className="product_container">
    {product_details.filter((element)=>{
        return context.isFiltered ? element.category === context.filterType : element;
    }).filter((element)=>{
        return context.storedText.every((tag)=>{ return ((element.title).toLocaleLowerCase()).includes(tag.toLocaleLowerCase().trim())});
    }).map((element)=>{
        return <Product key={element.asin} element={element}/>;
    })}
    </div>
    </div>;
}
