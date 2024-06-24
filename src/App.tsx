import { BrowserRouter } from "react-router-dom"
import GlobalProvider from "./contexts/GlobalProvider"
import AuthProvider from "./contexts/AuthProvider"
import MainNavigation from "./components/MainNavigation"
import Navbar from "./components/Navbar"
import ProductProvider from "./contexts/ProductProvider"
import CartProvider from "./contexts/CartProvider"
import OrderProvider from "./contexts/OrderProvider"

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>

                  <Navbar />
                  <div className="container p-4">
                    <MainNavigation />
                  </div>

                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
