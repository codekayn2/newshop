import  React, {Suspense} from "react"
import {Routes, Route} from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";


import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"))
const FullGenerator = React.lazy(() => import(/* webpackChunkName: "FullGenerator" */ "./pages/FullGenerator"))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="cart" element={
          <Suspense fallback={<div>Загрузка корзини...</div>}>
            <Cart />
          </Suspense>
        }/>
        <Route path="generators/:id" element={
         <Suspense fallback={<div>Загрузка...</div>}>
         <FullGenerator/>
       </Suspense>
        }/> 
        <Route path="*" element={
           <Suspense fallback={<div>Загрузка...</div>}>
           <NotFound />
         </Suspense>
        }/>
      </Route>
    </Routes>
  );
}

export default App;
