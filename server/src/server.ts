import fastify from "fastify";

const app = fastify();

app.get("/hello", (request) => {
  return "Hello World!";
});

app.listen({ port: 3333 }, (error, address) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("Server is running at port " + address);
});
