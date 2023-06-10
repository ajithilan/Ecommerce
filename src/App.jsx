import './App.css';
import {createContext, useState} from 'react';
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
    const [storedText,setStoredText] = useState([]);
    const [button_text,  setbutton_text] = useState('Search by Category');

    return <div className = 'App'>
        <AppContext.Provider value={{isFiltered,setIsFiltered,filterType,
            setFilterType,isSidebarActive, setIsSidebarActive,storedText,setStoredText,
            button_text,setbutton_text}}>
                <Routes>
                    <Route element={<><Topbar/><Sidebar/><Outlet/></>}>
                        <Route exact path='/' element={<Shop/>}/>
                        <Route path='cart' element={<Cart/>}/>
                        <Route path='favourites' element={<Favourites/>}/>
                    </Route>
                    <Route path='*' element = {<h1 className='error pt-5'>Error : Page not found!</h1>}/>
                </Routes>    
        </AppContext.Provider>
    </div>;
}

export default App;

