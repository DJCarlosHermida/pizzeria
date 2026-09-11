import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Checkout } from "./pages/Checkout"
import { Home } from "./pages/Home"
import { Menu } from "./pages/Menu"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedido" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
