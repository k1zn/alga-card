# alga-card
Библиотека на NodeJS для определения баланса карты [АЛҒА](https://alga-card.ru).

## Установка
```bash
$ npm i alga-card
```

## Использование

Вы можете передавать номер карты в формате строки как с пробелами, так и без них. Если возвращенный баланс равен -1, то карты не существует.

```javascript
import Alga from 'alga-card';

let balance = await Alga.getBalance("9643100203317283320")
console.log(balance) // 0

let anotherBalance = await Alga.getBalance("9643100203317222800")
console.log(anotherBalance) // -1
```