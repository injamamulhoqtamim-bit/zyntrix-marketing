const { MongoClient } = require("mongodb");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("DNS:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.u9fxluk.mongodb.net",
  (err, records) => {
    console.log("SRV RESULT:");
    console.log(err);
    console.log(records);
  }
);

const uri =
"mongodb://injamamulhoqtamim_db_user:rTcXJpTprO3CGBAu@ac-amaw9ww-shard-00-00.vvpngle.mongodb.net:27017,ac-amaw9ww-shard-00-01.vvpngle.mongodb.net:27017,ac-amaw9ww-shard-00-02.vvpngle.mongodb.net:27017/?ssl=true&replicaSet=atlas-6wps4l-shard-0&authSource=admin&appName=Cluster0";

(async () => {
  try {
    console.log("DNS:", dns.getServers());

   const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  tlsAllowInvalidCertificates: true,
});

    await client.connect();

    console.log("✅ Connected!");

    await client.db().admin().ping();

    console.log("Ping OK");

    await client.close();

  } catch (err) {
  console.error("MAIN ERROR:");
  console.dir(err, { depth: null });

  if (err.cause) {
    console.log("\nCAUSE:");
    console.dir(err.cause, { depth: null });
  }

  if (err.reason) {
    console.log("\nREASON:");
    console.dir(err.reason, { depth: null });
  }
}
})();