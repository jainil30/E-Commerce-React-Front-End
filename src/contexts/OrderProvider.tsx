import { createContext, useContext, useState } from "react"
import { useGlobalContext } from "./GlobalProvider";
import { makeOrder, getOrderList, updateOrderStatus } from "../API";
import { Cart, useCartContext } from "./CartProvider";
import { useAuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const orderContext = createContext<any>(null)

export type Order = {
    _id?: string,
    payment: { mode: string, details: string },
    user: any,
    products: Cart[],
    address: string,
    status: string,
    date?: string,
    __v?: number
}

const OrderProvider = ({ children }: any) => {
    const navigate = useNavigate()
    const { setLoading } = useGlobalContext()
    const { authToken } = useAuthContext()
    const { getCart } = useCartContext()

    const [orders, setOrders] = useState<Order[]>([])

    const placeOrder = (cart_ids: string[], address: string, payment_mode: string, payment_details: string) => {
        if(authToken != null) {
            setLoading(true);
            makeOrder(authToken, {cart_ids, address, payment_mode, payment_details})
                .then((res) => {
                    setLoading(false);
                    if(res.data._id) {
                        getCart()
                        alert('Order Placed Successful')
                    }else {
                        console.log('Failed to get orders', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to get orders");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    const getOrders = () => {
        if(authToken != null) {
            setLoading(true);
            getOrderList(authToken)
                .then((res) => {
                    setLoading(false);
                    if(Array.isArray(res.data)) {
                        setOrders(res.data)
                    }else {
                        console.log('Failed to get orders', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to get orders");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    const updateOrder = (order_id: string, status: string) => {
        if(authToken != null) {
            setLoading(true);
            updateOrderStatus(authToken, order_id, { status })
                .then((res) => {
                    setLoading(false);
                    if(res.data._id) {
                        alert('Order Status Updated Successful')
                    }else {
                        console.log('Failed to get orders', res.data)
                        if(res.data.error) {
                            alert(res.data.error);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Failed to get orders");
                    console.log(error);
                });
        }else {
            navigate('/login')
        }
    }

    return (
        <orderContext.Provider value={{ orders, placeOrder, getOrders, updateOrder }}>
            { children }
        </orderContext.Provider>
    )
}

export const useOrderContext = () => {
    if(!orderContext) {
        console.log("orderContext only can be used within OrderProvider")
        return null
    }
    return useContext(orderContext)
}

export default OrderProvider