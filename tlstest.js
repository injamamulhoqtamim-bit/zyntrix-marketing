const dns = require("node:dns");
const tls = require("node:tls");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dns.resolve4("ac-0yhkjmk-shard-00-00.u9fxluk.mongodb.net", (err, addresses) => {
  if (err) {
    console.error("DNS error:", err);
    return;
  }

  console.log("IP:", addresses[0]);

  const socket = tls.connect({
    host: addresses[0],
    port: 27017,
    servername: "ac-0yhkjmk-shard-00-00.u9fxluk.mongodb.net",
  });

  socket.on("secureConnect", () => {
    console.log("✅ TLS OK");
    socket.end();
  });

  socket.on("error", (e) => {
    console.error("TLS ERROR:", e);
  });
});