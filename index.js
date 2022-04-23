import fetch from 'node-fetch';

export default {

  async getBalance(number) {
    let req = await fetch('https://pay.brsc.ru/Alga.pay/BalanceOnTheCard.php', {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: 'POST',
      body: `cardnumber=${number.split(' ').join('')}`,
    })
    let text = await req.text();
    let bal = (/value=(.+) id="balance"/).exec(text)?.[1] * 1;
    return isNaN(bal) ? -1 : bal;
  }

};