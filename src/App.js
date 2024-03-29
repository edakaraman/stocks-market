import './App.css';
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import {StockOverviewPage} from './pages/StockOverviewPage';
import {StockDetailPage} from './pages/StockDetailPage';
import { WatchListContextProvider } from './context/watchListContext';
import {Auth} from "./pages/Auth"
function App() {
  return (
   <main className='container'>
    <WatchListContextProvider>
    <BrowserRouter>
     <Routes>
     <Route path='/' element = {<Auth/>}/>
     <Route path='/home' element={<StockOverviewPage/>}/>
      <Route path='/detail/:symbol' element = {<StockDetailPage/>}/>
     </Routes>
    </BrowserRouter>
    </WatchListContextProvider>
   </main>
  );
}
export default App;
