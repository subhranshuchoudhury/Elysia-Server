import { Elysia } from "elysia";
const superheroes = require("superheroes");

const app = new Elysia();

app.get("/", () => "Hello Elysia!");
app.get("/welcome", () => ({ message: "It is fast." }));
app.get("/random", () => ({ name: superheroes.random() }));
app.get("/all", () => ({ names: superheroes.all }));
app.get("/search/:name", (req) => {
  const name = req.params.name;
  const superheroesNames = superheroes.all;

  for (let i = 0; i < superheroesNames.length; i++) {
    const element = superheroesNames[i];
    if (element.includes(name)) {
      return {
        name: element,
      };
    }
  }

  return {
    message: "No match found",
  };
});
app.post("/my-hero", (context: any) => {
  const name = context.body.name;
  const random = superheroes.random();

  return {
    message: `Hey! ${name}, Your lucky partner is ${random}`,
  };
});
app.listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at server: ${app.server?.hostname}:${app.server?.port}`
);
