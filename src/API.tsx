import axios from "axios";

export const appURL = 
    process.env.NODE_ENV === "production"
        ? "https://ecommerce-react.vercel.app/"
        : "http://localhost:5173/";

export const apiURL =
    process.env.NODE_ENV === "production"
        ? "https://ecommerce-backend.vercel.app/api"
        : "http://localhost:4000/api";

const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 300000
});

// User Login
export function loginUser(data: { email: string, password: string }) {
    return axiosInstance.post(`/users/login`, data);
}
// User Signup
export function signUpUser(data: { name: string, email: string, password: string }) {
    return axiosInstance.post(`/users/signup`, data);
}
// Get All Products
export function getAllProducts() {
    return axiosInstance.get(`/products`);
}
// Get Product By ProductId
export function getProductById(id: string) {
    return axiosInstance.get(`/products/${id}`);
}
// Get Cart Items
export function getCartItems(token: string) {
    return axiosInstance.get(`/carts/get`, {
        headers: {
            "Auth-Token": token
        }
    });
}
// Add Item To Cart
export function addItemToCart(token: string, data: { product_id: string }) {
    return axiosInstance.post(`/carts`, data , {
        headers: {
            "Auth-Token": token
        }
    });
}
// Update Cart Qty By ProductId
export function updateCartQtyById(token: string, product_id: string, data: { qty: number }) {
    return axiosInstance.patch(`/carts/${product_id}`, data , {
        headers: {
            "Auth-Token": token
        }
    });
}
// Remove Item From Cart By CartId
export function removeItemFromCart(token: string, cart_id: string) {
    return axiosInstance.delete(`/carts/${cart_id}`, {
        headers: {
            "Auth-Token": token
        }
    });
}
// Create Order
export function createOrder(token: string, data: { cart_ids: string[] }) {
    return axiosInstance.post(`/carts/place-order`, data , {
        headers: {
            "Auth-Token": token
        }
    });
}
// Get Order List
export function getOrderList(token: string) {
    return axiosInstance.get(`/oredrs/get`, {
        headers: {
            "Auth-Token": token
        }
    });
}
// Make Order
export function makeOrder(token: string, data: { cart_ids: string[], address: string, payment_mode: string, payment_details: string }) {
    return axiosInstance.post(`/orders`, data , {
        headers: {
            "Auth-Token": token
        }
    });
}
// Update Order Status
export function updateOrderStatus(token: string, order_id: string, data: { status: string }) {
    return axiosInstance.patch(`/orders/${order_id}`, data , {
        headers: {
            "Auth-Token": token
        }
    });
}