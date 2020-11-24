import server from "./server";

server.start({ port: 3100 }, ({ port }) => {
  console.log("server on port", port);
});
