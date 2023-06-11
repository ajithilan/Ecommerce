import './App.css';
import {createContext, useEffect, useState} from 'react';
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
    const [resizerWindow, setResizerWindow] = useState(false);
    const [defaultButtonText, setDefaultButtonText] = useState('');
    const [buttonText, setButtonText] = useState('');

    const resizerHandle = ()=>{
        window.innerWidth <= 572 ? (
            setResizerWindow(true),
            setDefaultButtonText('Category')
        ) : (
            setResizerWindow(false),
            setDefaultButtonText('Search by Category')
        )
    }

    window.onresize = ()=>{ resizerHandle();}

    useEffect(()=>{
        resizerHandle();
        !(isFiltered) && setButtonText(resizerWindow ? 'Category' : 'Search by category');
    },[resizerWindow]);

    return <div className = 'App'>
        <AppContext.Provider value={{isFiltered,setIsFiltered,filterType,
            setFilterType,isSidebarActive, setIsSidebarActive,storedText,setStoredText,
            buttonText,setButtonText, resizerWindow, defaultButtonText}}>
                <Routes>
                    <Route element={<><Topbar/><Sidebar/><Outlet/></>}>
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

