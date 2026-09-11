import { Link } from "react-router-dom"
import { Hero, HomeExtras } from "../components/Hero"

export function Home() {
  return (
    <>
      <Hero />
      <HomeExtras />
      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="font-display text-3xl uppercase text-cream">¿Con hambre?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Armá el pedido en el menú, cargá tu dirección en Flor de Maroñas y lo mandamos por WhatsApp al local.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex rounded-xl bg-red px-8 py-3 font-display uppercase tracking-wider text-white hover:bg-red-2"
        >
          Pedir ahora
        </Link>
      </section>
    </>
  )
}
