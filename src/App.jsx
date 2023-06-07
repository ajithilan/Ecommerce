import './App.css';
import {createContext, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
            <Router>
            <Topbar/>
            <Sidebar/>
                <Routes>
                    <Route path='/Ecommerce/' element={<Shop/>}/>
                    <Route path='/Ecommerce/cart' element={<Cart/>}/>
                    <Route path='/Ecommerce/favourites' element={<Favourites/>}/>
                    <Route path='*' element = {<h1 className='pt-5'>Error : page not found!</h1>}/>
                </Routes>
            </Router>
        </AppContext.Provider>
    </div>;
}

export default App;

