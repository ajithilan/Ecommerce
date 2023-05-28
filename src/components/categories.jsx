import {useState,useContext} from 'react';
import { AppContext } from '../App';

export const Category = ()=>{
    const context = useContext(AppContext);
    
    const [catvisible, setCatVisible] = useState(false);

    const sort = (event)=>{
        context.setbutton_text(event.target.dataset.category);
        context.setFilterType(event.target.dataset.category);
        context.setIsFiltered(true);
        setCatVisible(!catvisible);
    }

    return <div className="dropdown">
        <button className='category_button'>{context.button_text}</button>
            <div className='dropdown_list'>
                <div className='categories' data-category = 'Smartphone' onClick={sort}><span className='bi-phone-fill'></span>Smartphone</div>
                <div className='categories' data-category = 'Laptop' onClick={sort}><span className='bi-laptop-fill'></span>Laptop</div>
                <div className='categories' data-category = 'Smartwatch' onClick={sort}><span className='bi-smartwatch'></span>Smart watch</div>
                <div className='categories' data-category = 'Speaker' onClick={sort}><span className='bi-speaker-fill'></span>Speaker</div>
            </div>
    </div>;

}