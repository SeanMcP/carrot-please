import { oak, view_engine } from "./deps.ts";
import db, { initialize as initDb } from "./db.ts";

initDb();

const router = new oak.Router();

router.get("/", async (context: oak.Context) => {
  await db((connection) => {
    for (const row of connection.query("SELECT * FROM carrot")) {
      console.log(row);
    }
  });

  context.render("index", { data: "world" });
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  view_engine.viewEngine(
    view_engine.adapterFactory.getOakAdapter(),
    view_engine.engineFactory.getHandlebarsEngine(),
    {
      viewRoot: "./views",
      viewExt: ".handlebars",
    }
  )
);

await app.listen({ port: 8000 });
