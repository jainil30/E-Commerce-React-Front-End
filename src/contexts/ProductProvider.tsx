import { createContext, useContext, useState } from "react"
import { useGlobalContext } from "./GlobalProvider";
import { getAllProducts, getProductById } from "../API";

export const productContext = createContext<any>(null)

export type Product = {
    _id?: string,
    user: string,
    name: string,
    price: number,
    image: string,
    date?: string,
    qty?: number,
    __v?: number
}

const ProductProvider = ({ children }: any) => {
    const { setLoading } = useGlobalContext();

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>(null)

    const getProducts = () => {
        setLoading(true);
        getAllProducts()
            .then((res) => {
                setLoading(false);
                if(Array.isArray(res.data)) {
                    setProducts(res.data)
                }else {
                    console.log('Failed to get products', res.data)
                    if(res.data.error) {
                        alert(res.data.error);
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get products");
                console.log(error);
            });
    }

    const getProductDetails = (product_id: string) => {
        setLoading(true);
        getProductById(product_id)
            .then((res) => {
                setLoading(false);
                if(res.data._id) {
                    setProduct(res.data)
                }else {
                    console.log("Failed to get product details", res.data)
                    if(res.data.error) {
                        alert(res.data.error);
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                alert("Failed to get product details");
                console.log(error);
            });
    };

    return (
        <productContext.Provider value={{ getProductDetails, getProducts, products, product, setProduct }}>
            { children }
        </productContext.Provider>
    )
}

export const useProductContext = () => {
    if(!productContext) {
        console.log("productContext only can be used within ProductProvider")
        return null
    }
    return useContext(productContext)
}

export default ProductProvider