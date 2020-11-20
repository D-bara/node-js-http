const qs = require('querystring');
const answer = qs.parse('name=吉村&yaki-shabu=しゃぶしゃぶ');
console.log(answer['name']);
console.log(answer['yaki-shabu']);
