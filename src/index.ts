import { Hono } from "hono";
import fontRoutes from "./routes/font";
import homeRoutes from "./routes/home";
import postRoutes from "./routes/posts";
import { renderNotFound } from "./views/notFound";

const app = new Hono();

app.route("/", homeRoutes);
app.route("/posts", postRoutes);
app.route("/font", fontRoutes);
app.notFound((c) => c.html(renderNotFound(), 404));

export default app;
