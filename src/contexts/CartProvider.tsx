import { createContext, useContext, useState } from "react"
import { useGlobalContext } from "./GlobalProvider";
import { getCartItems, addItemToCart, updateCartQtyById, removeItemFromCart } from "../API";
import { Product } from "./ProductProvider";
import { useAuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const cartContext = createContext<any>(null)

export type Cart = {
    _id?: string,
    user: any,
    product: Product,
    quantity: number,
    type: string,
    date?: string,
    __v?: number
}

const CartProvider = ({ children }: any) => {
    const navigate = useNavigate()
    const { setLoading } = useGlobalContext()
    const { authToken } = useAuthContext()

    const [cartItems, setCartItems] = useState<Cart[]>([])

    const getCart = () => {
        if(authToken != null) {
            setLoading(true);
            getCartItems(authToken)
                .then((res) => {
                    setLoading(false);
                    if(Array.isArray(res.data)) {
                        setCartItems(res.data)
                    }else {
                        console.log('Failed to get carts', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to get carts");
                    console.log(error);
                });
        }
    }

    const addToCart = (product_id: string) => {
        if(authToken != null) {
            setLoading(true);
            addItemToCart(authToken, { product_id })
                .then((res) => {
                    setLoading(false);
                    if(res.data._id) {
                        getCart()
                        alert('Item added to cart')
                    }else {
                        console.log('Failed to add item to cart', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to add item to cart");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    const updateCartQty = (product_id: string, qty: number) => {
        if(authToken != null) {
            setLoading(true);
            updateCartQtyById(authToken, product_id, { qty })
                .then((res) => {
                    setLoading(false);
                    if(res.data._id) {
                        getCart()
                    }else {
                        console.log('Failed to update cart', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to update cart");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    const removeFromCart = (cart_id: string) => {
        if(authToken != null) {
            setLoading(true);
            removeItemFromCart(authToken, cart_id)
                .then((res) => {
                    setLoading(false);
                    if(!res.data._id) {
                        console.log('Failed to remove cart item', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to remove cart item");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    return (
        <cartContext.Provider value={{ cartItems, getCart, addToCart, updateCartQty, removeFromCart }}>
            { children }
        </cartContext.Provider>
    )
}

export const useCartContext = () => {
    if(!cartContext) {
        console.log("cartContext only can be used within CartProvider")
        return null
    }
    return useContext(cartContext)
}

export default CartProvider