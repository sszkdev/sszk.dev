import { Hono } from "hono";
import homeRoutes from "./routes/home";
import postRoutes from "./routes/posts";

const app = new Hono();

app.route("/", homeRoutes);
app.route("/posts", postRoutes);

export default app;
