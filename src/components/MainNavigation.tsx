import { useAuthContext } from '../contexts/AuthProvider';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import ProductDetails from '../pages/ProductDetails';

const MainNavigation = () => {
    const { authToken } = useAuthContext();

    // const RedirectLogin = <Navigate to="/login" />;
    const RedirectHome = <Navigate to="/" />;

    return (
        <Routes>
            <Route path="/" element={<Products as="Home" />}/>
            <Route path="/products" element={<Products as="Products" />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/product-details/:id" element={<ProductDetails />}/>
            
            <Route path="/login" element={!authToken ? <Login /> : RedirectHome} />
            <Route path="/signup" element={!authToken ? <SignUp /> : RedirectHome} />
        </Routes>
    )
}

export default MainNavigation