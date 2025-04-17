import { rest } from "msw";

export const handlers = [
  rest.get("/products/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      { id: 1, name: "Arroz", category: "Alimento" }
    ]));
  }),

  rest.post("/products/", async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 999 }));
  }),

  rest.delete("/products/:id", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get("/markets/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      { id: 1, name: "Mercado Central" }
    ]));
  }),

  rest.post("/markets/", async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 100 }));
  }),

  rest.delete("/markets/:id", (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get("/prices/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      {
        id: 1,
        product: { name: "Feijão" },
        market: { name: "Mercado X" },
        price: 7.9
      }
    ]));
  }),

  rest.post("/prices/", async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ ...body, id: 123 }));
  }),

  rest.delete("/prices/:id", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
