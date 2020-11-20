'use strict';
const http = require('http');
const pug = require('pug');

const server = http.createServer((req, res) => {
	const now = new Date();
	console.info(
		`[${now}] Requested by ${req.connection.remoteAddress}`
	)
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8'
	});

	switch (req.method) {
		case 'GET':
			if (req.url === '/') {
				res.write(`<h1>アンケートフォーム</h1>
					<a href="/enquetes">アンケート一覧</a>`);
			} else if (req.url === '/enquetes') {
				res.write(`<h1>アンケート一覧</h1><ul>
					<li><a href="/enquetes/yaki-shabu">焼き肉・しゃぶしゃぶ</a></li>
					<li><a href="/enquetes/rice-bread">ごはん・パン</a></li>
					<li><a href="/enquetes/football-baseball">サッカー・野球</a></li>
					</ul>`);
			} else if (req.url === '/enquetes/yaki-shabu'){
				res.write(pug.renderFile('./form.pug', {
				path: req.url,
				firstItem: '焼肉',
				secondItem: 'しゃぶしゃぶ'
				}));
			} else if (req.url === '/enquetes/rice-bread') {
				res.write(pug.renderFile('./form.pug', {
				path: req.url,
				firstItem: 'ごはん',
				secondItem: 'パン'
				}));
			}else if (req.url === '/enquetes/football-baseball') {
				res.write(pug.renderFile('./form.pug', {
				path: req.url,
				firstItem: 'サッカー',
				secondItem: '野球'
				}));
			}
			res.end();
			break;
		case 'POST':
			let body = '';
			req.on('data', (chunk) => {
				body += chunk;
			}).on('end', () => {
				const decoded = decodeURIComponent(body);
				const qs = require('querystring');
				const answer = qs.parse(decoded);
				console.info(`[${now}] 投稿: 食べたいものは${answer['favorite']} by:${answer['name']}`);
				res.write(`<h1>${answer['name']}さんは${answer['favorite']} に投票しました</h1>
					<a href="/enquetes">アンケート一覧</a>`);
				res.end();
			});
			break;
		case 'PUT':
			res.write(`PUT ${req.url} \n`);
			res.end();
			break;
		case 'DELETE':
			res.write(`DELETE ${req.url} \n`);
			res.end();
			break;
		default:
			res.end();
			break;
	}
}).on('error', e => {
	console.error(`[${new Date()}] Server Error`, e);
}).on('clientError', e => {
	console.error(`[${new Date()}] Client Error`, e);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.info(`[${new Date()}] Listening on ${port}`);
});