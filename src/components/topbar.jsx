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

    useEffect(()=>{
      setIshomepage(location.pathname === '/' ? true : false);
    },[location]);

    const toggleSidebar = ()=>{
        document.getElementById('nav_overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
        context.setIsactive(!context.isactive);
    }

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
        context.setbutton_text('Search by Category');
        context.setIsFiltered(false);
    }

    const clearTag = (index)=>{
        tags = context.storedText.filter((element,ind)=>{
            return ind !== index;
        });
        context.setStoredText(tags);
        tags.length ? null : setcheckTags(false);
    }

    return <>
    <div className="nav_overlay" id='nav_overlay'></div>
    <div className='topbar'>
        <button type="button" className="sidebar_button btn btn-outline-light bi-list" onClick={toggleSidebar}></button>
        <div className="links_container">
        <Link className="links bi-house-gear" to='/'>Shop</Link>
        <Link className='links bi-heart' to='/favourites'>Favourites</Link>
        <Link className="links bi-cart" to='/cart'>Cart</Link>
        </div>
        { isHomepage ? <>
        <div className="sort_container">
          <div className='category_remove_container d-flex align-items-center'>
          <Category/>
          {context.isFiltered && <button className='remove ms-2' onClick={remove}>Remove filter</button> }
          </div>
          <div className = 'search_container'>
              <div>
                <input className='searchbar' placeholder="Enter Search" onChange={trace} onKeyDown = {keyPress} value={searchtext}/>
                <button className="searchbutton bi-search" onClick={beginSearch}></button>
              </div>
          </div>
        </div>
        <div className={(checkTags ? 'd-flex' : 'd-none') + " tags_container"}>
        {context.storedText.map((element, index)=>{ return <button key={index} onClick={()=>{clearTag(index);}} className='tags'>{element}<span className='clear_search bi-x-lg ps-1'></span></button>})}
        </div>
        </> : null
        }
        </div>
        </>
}
