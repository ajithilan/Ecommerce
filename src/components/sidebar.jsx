import { AppContext } from '../App'
import { useContext } from 'react'
import categories from '../rawdata/categories'

export const Sidebar = ()=>{
    const context = useContext(AppContext);
    
    const nav_overlay = document.getElementById('nav_overlay');
    const slide = ()=>{
        nav_overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        context.setIsSidebarActive(!context.isSidebarActive);
    }
    
    nav_overlay ? nav_overlay.onclick = slide : null;

    return <>
        <nav className={('sidebar ' + (context.isSidebarActive ? 'active' : ''))} id='sidebar'>
            <div className='sidebar_title'>
                <span className='s_title_bg'><b>CATEGORIES</b></span>
                <button type="button" className={'close bi-x-lg '} onClick={slide}></button>
            </div>
            <div className="sidebar_categories_container">
            {categories.map((category)=>{
                return <a href='#' className={'sidebar_categories' + (category === 'Electronics' ? ' selected' : '')} key={category}>{category}</a>
            })}
            </div>
        </nav>
    </>
}