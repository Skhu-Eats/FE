import express from "express";
import cors from "cors";
import { createMiddleware } from "@mswjs/http-middleware";
import { handlers } from "./handlers";

const app = express();
const PORT = 9090;

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[MSW] ${req.method} ${req.path}`);
  next();
});

app.use(createMiddleware(...handlers));

app.listen(PORT, () => {
  console.log(`[MSW] Mock server running on http://localhost:${PORT}`);
});
