import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useProductContext } from "../contexts/ProductProvider"
import { useCartContext } from "../contexts/CartProvider"

const ProductDetails = () => {
    const { id } = useParams()
    const { product, getProductDetails, setProduct } = useProductContext()
    const { getCart, cartItems, addToCart, updateCartQty } = useCartContext()

    useEffect(() => {
        if (product && cartItems) {
            let carts = [...cartItems]
            setProduct({ ...product, qty: carts.find((c: any) => c.product._id === product._id) != undefined ? carts.find((c: any) => c.product._id === product._id).quantity : 0 })
        }
    }, [cartItems])

    const handleAddToCart = (pid: string) => {
        addToCart(pid)
    }

    const handleQtyUpdate = (pid: string, qty: number) => {
        updateCartQty(pid, qty)
    }

    useEffect(() => {
        if (id && id.trim() != '') {
            getProductDetails(id);
        }
        getCart()

        return () => setProduct(null)
    }, [])

    return (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                {product ?
                    <div className="card">
                        <img src={product.image} className="card-img-top" alt="product-image" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h4>₹ {product.price}</h4>
                                {product.qty && product.qty != 0
                                    ?<div className='d-flex justify-content-start'>
                                        <button className="btn btn-primary" onClick={() => handleQtyUpdate(product._id, product.qty - 1)}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                        <span className="card py-1 px-3 fs-5 mx-2">{product.qty}</span>
                                        <button className="btn btn-primary" onClick={() => handleQtyUpdate(product._id, product.qty + 1)}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    :<button className="btn btn-primary w-100" onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
                                }
                        </div>
                    </div>
                :<></>}
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

export default ProductDetails