import {useContext} from 'react';
import { AppContext } from '../App';

export const Category = ()=>{
    const context = useContext(AppContext);

    const sort = (event)=>{
        context.setButtonText(event.target.dataset.category);
        context.setFilterType(event.target.dataset.category);
        context.setIsFiltered(true);
        navigator.userAgentData.mobile && (document.querySelector('.dropdown_list').style.display = 'none')
    }

    const handleClick = ()=>{
            navigator.userAgentData.mobile && (document.querySelector('.dropdown_list').style.display = 'block');
    }

    return <div className="dropdown">
        <button className='category_button' onClick={handleClick} >{context.isFiltered ? context.buttonText : (context.resizerWindowforMobile ? 'Category' : 'Search by Category')}</button>
            <div className='dropdown_list'>
                <div className='categories' data-category = 'Smartphone' onClick={sort}><span className='bi-phone-fill'>Smartphone</span></div>
                <div className='categories' data-category = 'Laptop' onClick={sort}><span className='bi-laptop-fill'>Laptop</span></div>
                <div className='categories' data-category = 'Smartwatch' onClick={sort}><span className='bi-smartwatch'>Smartwatch</span></div>
                <div className='categories' data-category = 'Speaker' onClick={sort}><span className='bi-speaker-fill'>Speaker</span></div>
            </div>
    </div>;

}