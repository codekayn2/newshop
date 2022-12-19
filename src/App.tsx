import {Routes, Route} from "react-router-dom";


import "./scss/app.scss";


import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullGenerator from "./pages/FullGenerator"
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="generators/:id" element={<FullGenerator />}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
