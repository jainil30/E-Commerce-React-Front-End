import { useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductProvider'
import { useCartContext } from '../contexts/CartProvider'
import { Link } from 'react-router-dom'

const Products = ({ as }: any) => {
    const [productList, setProductList] = useState<any>([])
    const { getProducts, products } = useProductContext()
    const { getCart, cartItems, addToCart, updateCartQty } = useCartContext()

    useEffect(() => {
        if(products && cartItems && products.length > 0) {
            console.log('called')
            let items = [...products]
            let carts = [...cartItems]
            setProductList(items.filter((p: any) => { p.qty = carts.find((c: any) => c.product._id === p._id) != undefined?carts.find((c: any) => c.product._id === p._id).quantity:0; return true; }))
        }
    }, [cartItems, products])

    useEffect(() => {
        getProducts()
        getCart()
    }, [])

    const handleAddToCart = (pid: string) => {
        addToCart(pid)
    }

    const handleQtyUpdate = (pid: string, qty: number) => {
        updateCartQty(pid, qty)
    }

    return (
        <div key={productList}>
            <h3>{as}</h3>
            <div className="row mt-3">
                {productList && productList.map((p: any) =>
                    <div className="col-md-3" key={p._id}>
                        <div className="card mt-3">
                            <Link to={`/product-details/${p._id}`}>
                                <img src={p.image} className="card-img-top" alt="product-image" />
                            </Link>
                                <div className="card-body">
                                    <Link to={`/product-details/${p._id}`} style={{textDecoration: 'none', color: '#000'}}>
                                        <h5 className="card-title">{p.name}</h5>
                                        <h4>₹ {p.price}</h4>
                                    </Link>
                                    { p.qty === 0
                                        ? <button className="btn btn-primary w-100" onClick={() => handleAddToCart(p._id)}>Add To Cart</button>
                                        : <div className='d-flex justify-content-evenly'>
                                            <button className="btn btn-primary" onClick={() => handleQtyUpdate(p._id, p.qty - 1)}>
                                                <i className="bi bi-dash-lg"></i>
                                            </button>
                                            <span className="card py-1 px-3 fs-5">{p.qty}</span>
                                            <button className="btn btn-primary" onClick={() => handleQtyUpdate(p._id, p.qty + 1)}>
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    }
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products