const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.u9fxluk.mongodb.net",
  (err, records) => {
    console.log("ERR =", err);
    console.log("RECORDS =", records);
  }
);