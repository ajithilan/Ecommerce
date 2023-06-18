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
    const filterStateRef = useRef();

    const resizerHandle = ()=>{
        setResizerWindowforMobile(window.innerWidth <= 600 ? true : false);
        setIsHalfscreen(window.innerWidth <=1200 ? true : false);
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
        <AppContext.Provider value={{isFiltered,setIsFiltered,filterType,
            setFilterType,isSidebarActive, setIsSidebarActive,storedText,setStoredText,
            buttonText,setButtonText,resizerWindowforMobile, filterStateRef, dropdownActive, setDropdownActive}}>
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

