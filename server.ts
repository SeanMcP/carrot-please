import { Application, Router } from "./deps.ts";
import db, { initialize as initDb } from "./db.ts";

initDb();

const router = new Router();

router.get("/", async (context) => {
  await db((connection) => {
    for (const row of connection.query("SELECT * FROM carrot")) {
      console.log(row);
    }
  });

  context.response.body = "Hello world!";
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
