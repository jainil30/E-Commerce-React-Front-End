import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthProvider'

const Navbar = () => {
    const { authToken, logoutUser } = useAuthContext()
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">E-Commerce React</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {!authToken?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </>
                        :<>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li> */}
                        </>}
                    </ul>
                    <form className="d-flex" role="search">
                        <Link type="button" className="btn btn-primary" style={{width: 100}} to="/cart">
                            <i className="bi bi-cart-fill"></i>
                            <span className='ms-2'>Cart</span>
                        </Link>
                        {authToken?
                            <button type="button" className="btn btn-primary ms-2" style={{width: 100}} onClick={logoutUser}>
                                <span className='me-2'>Logout</span>
                                <i className="bi bi-box-arrow-right"></i>
                            </button>
                        :<></>}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar