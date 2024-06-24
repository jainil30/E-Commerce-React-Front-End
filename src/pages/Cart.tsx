import { useEffect, useState } from 'react'
import { useCartContext } from '../contexts/CartProvider'
import { useOrderContext } from '../contexts/OrderProvider'

const Cart = () => {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [address, setAddress] = useState<string>("")
  const [payment_mode, setPaymentMode] = useState<string>("")
  const { cartItems, getCart, updateCartQty } = useCartContext()
  const { placeOrder } = useOrderContext()

  useEffect(() => {
    getCart()
  }, [])

  useEffect(() => {
    if(cartItems && cartItems.length > 0) {
      setTotalItems(cartItems.reduce((t: number, c: any) => t + c.quantity , 0))
      setTotalAmount(cartItems.reduce((t: number, c: any) => t + (c.product.price * c.quantity) , 0))
    }
  }, [cartItems])

  const handleQtyUpdate = (pid: string, qty: number) => {
    updateCartQty(pid, qty)
  }

  const handlePlaceOrder = () => {
    if(cartItems && Array.isArray(cartItems) && cartItems.length > 0 && address.trim() != '' && payment_mode.trim() != '') {
      placeOrder(cartItems.map((c: any) => c._id), address.trim(), payment_mode.trim(), `₹ ${totalAmount} Cash`)
    }else {
      alert('Order details are invalid')
    }
  }

  return (
    <div className='row'>
      <div className="col-md-3"></div>
      {cartItems && Array.isArray(cartItems) && cartItems.length === 0?
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h4>Your Cart is Empty ;)</h4>
            </div>
          </div>
        </div>
      :<div className="col-md-6">
        <div className="d-flex justify-content-between">
          <h5>Basket: ({totalItems})</h5>
          <h5>Total Amount: ₹ {totalAmount}</h5>
        </div>
        {cartItems && cartItems.map((item: any) =>
          <div className="card d-flex flex-row mt-3">
            <img src={item.product.image} className="card-img-left" style={{width: 150}} alt="product-image" />
            <div className="card-body">
              <h5 className="card-title">{item.product.name}</h5>
              <h4>₹ {item.product.price}</h4>
              <div className='d-flex justify-content-end'>
                <button className="btn btn-primary" onClick={() => handleQtyUpdate(item.product._id, item.quantity - 1)}>
                  <i className="bi bi-dash-lg"></i>
                </button>
                <span className="card py-1 px-3 fs-5 mx-2">{item.quantity}</span>
                <button className="btn btn-primary" onClick={() => handleQtyUpdate(item.product._id, item.quantity + 1)}>
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        <hr />
        <h5>Payment and Shiping Details</h5>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea className="form-control" id="address" rows={3} onChange={(e) => setAddress(e.target.value)}>{address}</textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Payment Mode</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setPaymentMode(e.target.value)} value={payment_mode}>
            <option value="" selected>Select payment mode</option>
            <option value="COD">Cash On Delevery</option>
          </select>
        </div>
        <button className="btn btn-primary w-100" onClick={handlePlaceOrder}>Place Order</button>
      </div>
      }
      <div className="col-md-3"></div>
    </div>
  )
}

export default Cart