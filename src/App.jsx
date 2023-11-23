import './App.css';
import {createContext, useEffect, useRef, useState} from 'react';
import { Routes, Route, Outlet} from 'react-router-dom';
import { Shop } from './routes/shop';
import { Cart } from './routes/cart';
import {Favourites} from './routes/favourites';
import { Topbar } from './components/topbar';
import { Sidebar } from './components/sidebar';

export const AppContext = createContext();

function App() {
    const [isFiltered , setIsFiltered] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [storedText, setStoredText] = useState([]);
    const [resizerWindowforMobile, setResizerWindowforMobile] = useState(false);
    const [buttonText, setButtonText] = useState('');
    const [isHalfscreen, setIsHalfscreen] = useState(undefined);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [favtResizer, setFavtResizer] = useState(false);
    const [favtButtonsResizer, setFavtButtonsResizer] = useState(false);
    const filterStateRef = useRef();
    const contextToPass = {isFiltered,setIsFiltered,filterType,
        setFilterType,isSidebarActive, setIsSidebarActive,storedText,setStoredText,
        buttonText,setButtonText,resizerWindowforMobile,filterStateRef,dropdownActive,
        setDropdownActive,favtResizer,favtButtonsResizer};

    const resizerHandle = ()=>{
        const windowWidth = window.innerWidth;
        setResizerWindowforMobile(windowWidth <= 600 ? true : false);
        setIsHalfscreen(windowWidth <=1200 ? true : false);
        setFavtResizer(windowWidth <= 572 ? true : false);
        setFavtButtonsResizer(windowWidth <= 470 ? true : false);
    }

    function fullscreenSidebarToggle(width, ml){
        const topbar = document.querySelector('.topbar');
        topbar.style.width = width;
        topbar.style.marginLeft = ml;
        topbar.style.transition = '.3s ease-in-out';
    }

    function halfscreenResizer(){
        isHalfscreen ? (setIsSidebarActive(false), fullscreenSidebarToggle('100%','0px')):
        (fullscreenSidebarToggle('calc(100% - 238px)','238px'),
        document.body.style.overflow = 'auto',
        document.getElementById('nav_overlay').style.display = 'none',
        setIsSidebarActive(true));
    }

    useEffect(()=>{
        halfscreenResizer();
    },[isHalfscreen])

    window.onresize = ()=>{
        resizerHandle();
    }

    useEffect(()=>{
        resizerHandle();
    },[resizerWindowforMobile]);

    return <div className = 'App'>
        <AppContext.Provider value={contextToPass}>
                <Routes>
                    <Route element={<><Topbar fullscreenSidebarToggle={fullscreenSidebarToggle}/><Sidebar/><Outlet/></>}>
                        <Route path='/' element={<Shop/>}/>
                        <Route path='cart' element={<Cart/>}/>
                        <Route path='favourites' element={<Favourites/>}/>
                    </Route>
                    <Route path='*' element = {<h1 className='error'>Error : Page not found!</h1>}/>
                </Routes>    
        </AppContext.Provider>
    </div>;
}

export default App;

