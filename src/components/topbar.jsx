import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { Category } from "./categories"

export const Topbar = ()=>{
    const context = useContext(AppContext);

    var tags = [];
    const [searchtext, setSearchText] = useState('');
    const [isHomepage, setIshomepage] = useState(true);
    const [checkTags, setcheckTags] = useState(false);
    const location = useLocation();
    const resizerValue = context.resizerWindow;

    useEffect(()=>{
      setIshomepage(location.pathname === '/' ? true : false);
    },[location]);

    function fullscreenSidebarToggle(width, ml){
        const topbar = document.querySelector('.topbar');
        topbar.style.width = width;
        topbar.style.marginLeft = ml;
    }

    const toggleSidebar = ()=>{
      window.innerWidth >= 1200 ? (context.isSidebarActive ? fullscreenSidebarToggle('100%','0px') : fullscreenSidebarToggle('calc(100% - 238px)','238px')) : (document.body.style.overflow = 'hidden', document.getElementById('nav_overlay').style.display = 'block');
      context.setIsSidebarActive(!context.isSidebarActive);
    }

    useEffect(()=>{
      window.innerWidth >= 1200 && (context.setIsSidebarActive(true),fullscreenSidebarToggle('calc(100% - 238px)','238px'));
    },[])

    const trace = (event)=>{
      setSearchText(event.target.value);
    }

    const beginSearch = ()=>{
      var temp = searchtext.trim();
      temp !== '' && context.setStoredText([...context.storedText, temp]);
      context.storedText !== [] && setcheckTags(true);
      setSearchText('');
    }

    const keyPress = (event)=>{
      if(event.key === 'Enter'){
          beginSearch();
      }
    }

    const remove = ()=>{
        context.setButtonText(context.defaultButtonText);
        context.setIsFiltered(false);
    }

    const clearTag = (index)=>{
        tags = context.storedText.filter((element,ind) => ind !== index);
        context.setStoredText(tags);
        tags.length ? null : setcheckTags(false);
    }

    return <>
    <div className="nav_overlay" id='nav_overlay'></div>
    <div className='topbar'>
        <button type="button" className={'sidebar_button btn btn-outline-light ' + (context.isSidebarActive ? 'bi-arrow-bar-left' : 'bi-list')} onClick={toggleSidebar}></button>
        <div className="links_container">
        <Link className="links bi-house-gear" to='/'><span className="link_text">Shop</span></Link>
        <Link className='links bi-heart' to='/favourites'><span className="link_text">Favourites</span></Link>
        <Link className="links bi-cart" to='/cart'><span className="link_text">Cart</span></Link>
        </div>
        { isHomepage ? <>
        <div className="sort_container">
          <div className='category_remove_container d-flex align-items-center'>
          <Category/>
          {context.isFiltered && <button className='remove ms-2' onClick={remove}>{ resizerValue ? 'Remove' : 'Remove filter'}<span className={ resizerValue && 'bi-filter fs-5 test'}></span></button> }
          </div>
          <div className = 'search_container'>
                <input className='searchbar' placeholder={resizerValue ? 'Search' : 'Enter Search'} onChange={trace} onKeyDown = {keyPress} value={searchtext}/>
                <button className="searchbutton bi-search" onClick={beginSearch}></button>
          </div>
        </div>
        <div className={(checkTags ? 'd-flex' : 'd-none') + " tags_container"}>
        {context.storedText.map((element, index)=>{ return <button key={index} onClick={()=>{clearTag(index);}} className='tags'><span className="tag_name">{element}</span><span className='clear_search bi-x-lg ps-1'></span></button>})}
        </div>
        </> : null
        }
        </div>
        </>
}
