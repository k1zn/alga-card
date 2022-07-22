import https from "https";

function makeRequest(options) {
  return new Promise((pres, rej) => {
    options.headers = options.headers ?? {};
    options.headers["Content-Length"] =
      options.headers["Content-Length"] ?? options.data.length;
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });
      res.on("end", () => {
        res.text = data;
        pres(res);
      });
    });

    req.on("error", (error) => {
      rej(err);
    });

    if (options.data) req.write(options.data);
    req.end();
  });
}

class AlgaCard {
  static async getBalance(number) {
    const res = await makeRequest({
      hostname: "pay.brsc.ru",
      port: 443,
      path: "/Alga.pay/BalanceOnTheCard.php",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `cardnumber=${number.split(" ").join("")}`,
    });
  
    let text = res.text;
    let bal = /value=(.+) id="balance"/.exec(text)?.[1] * 1;
    return isNaN(bal) ? -1 : bal;
  }
}

export default AlgaCard