import fetch from 'node-fetch';

class Alga {
  constructor(number) {
    if(!number) throw new Error('Card number is required.');
    this.number = number?.split ? number.split(' ').join('') : number;
    console.log(this.number)
  }

  async getBalance() {
    let req = await fetch('https://pay.brsc.ru/Alga.pay/BalanceOnTheCard.php', {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: 'POST',
      body: `cardnumber=${this.number}`,
    })
    let text = await req.text();

    return (/value=(.+) id="balance"/).exec(text)?.[1] || "-1"
  }

}

module.exports = Alga;