# Demo Pizzería

Sitio de pedidos para una pizzería de delivery. El cliente arma el carrito en la web y el local recibe el pedido listo por WhatsApp.

**Demo en vivo:** [demopizzeriauy.vercel.app](https://demopizzeriauy.vercel.app)

> Es una maqueta para mostrar a locales. Marca, zona, horarios y precios son de ejemplo y se cambian en un solo archivo.

---

## Qué resuelve

Muchos locales todavía toman pedidos a mano por chat. Esta demo muestra un flujo más claro, sin app ni cuenta:

1. El cliente entra al menú y agrega productos.
2. Completa nombre, teléfono, dirección y medio de pago.
3. Envía. Se abre WhatsApp con el mensaje armado para el local.

Sin backend, sin login y sin pasarela de cobro. El negocio sigue confirmando por WhatsApp, pero el pedido llega ordenado.

## Funciona así

| Paso | Ruta | Qué pasa |
| --- | --- | --- |
| Inicio | `/` | Marca, promo del día y cómo pedir |
| Menú | `/menu` | Carta filtrable: pizzas, hamburguesas, milanesas, promo, extras |
| Pedido | `/pedido` | Carrito, datos de entrega y envío a WhatsApp |

También incluye:

- Horario abierto/cerrado según Montevideo (lun–sáb, 19:00–00:00)
- Gustos en pizzas (jamón, napolitana, morrones, etc.)
- Carne o pollo en milanesas
- Hamburguesas simple, doble, triple y 4 carnes, con fritas y bebida
- Pago en efectivo o débito
- Carrito persistente en el navegador
- Pedido fuera de horario: el mensaje lo aclara, pero igual se puede enviar

## Stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Router](https://reactrouter.com/) 7
- [Lucide](https://lucide.dev/) para iconos
- Pedidos vía [wa.me](https://faq.whatsapp.com/591339475566160)
- Hosting en [Vercel](https://vercel.com/)

SPA: las rutas las resuelve el cliente. En Vercel, `vercel.json` reescribe todo a `index.html`.

## Personalizar para un local

Todo lo comercial vive en [`src/data/catalog.ts`](src/data/catalog.ts):

```ts
export const BRAND = {
  name: "NOMBRE",
  tagline: "SLOGAN",
  zone: "Barrio de ejemplo",
  hoursLabel: "Lunes a sábados · 19:00 a 00:00 hs",
  phoneDisplay: "091 332 854",
  whatsappE164: "59891332854", // código de país + número, sin + ni espacios
  timezone: "America/Montevideo",
}
```

Ahí mismo se editan productos, precios, categorías e imágenes (`public/img/menu/`).

El título y la descripción de `index.html` conviene alinearlos con el nombre real del local.

## Desarrollo local

Hace falta Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:5174](http://localhost:5174).

```bash
npm run build    # producción
npm run preview  # sirve el build
```

## Deploy

El proyecto está linkeado a Vercel como `demopizzeriauy`.

```bash
npx vercel --prod
```

Producción: [https://demopizzeriauy.vercel.app](https://demopizzeriauy.vercel.app)

## Estructura

```
src/
  components/   # layout, menú, carrito, hero
  context/      # carrito (localStorage)
  data/         # marca y carta
  lib/          # WhatsApp, horario, formato
  pages/        # Inicio, Menú, Pedido
public/img/menu/
```

## Notas

- Los precios de extras y de algunas promos son de muestra. Hay que cargarlos con la carta real del local.
- El número de WhatsApp de la demo es de prueba. Cambiar `whatsappE164` antes de mostrárselo a un cliente.
- El horario en código cierra los domingos y abre desde las 19:00. Si el local trabaja otro régimen, se ajusta en `src/lib/hours.ts`.
