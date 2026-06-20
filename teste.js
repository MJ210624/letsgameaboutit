const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.mauricioferreira.pexiplq.mongodb.net",
  (err, records) => {
    console.log("Erro:", err);
    console.log("Records:", records);
  }
);