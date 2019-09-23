const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.listen(3000, () => {
	console.log('server is running');
});

app.get('/catalogData', (req, res) => {
	fs.readFile('catalog.json', 'utf-8', (err, data) => {
		res.send(data);
	})
});

app.get('/cartData', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		res.send(data);
	})
});

app.post('/addToCart', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		const cart = JSON.parse(data);
		const item = req.body;

		cart.push(item);
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send(JSON.stringify({
					result: 0
				}))
			} else {
				res.send(JSON.stringify({
					result: 1
				}))
			}
		})
	})
});

app.post('/removeFromCart', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		const cart = JSON.parse(data);
		const good = cart.find((currentGood) => {
			return currentGood.id === req.body.id;
		});
		const goodId = cart.indexOf(good);

		cart.splice(goodId, 1);
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send(JSON.stringify({
					result: 0
				}))
			} else {
				res.send(JSON.stringify({
					result: 1
				}))
			}
		})
	})
});

app.post('/minusOneItem', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		const cart = JSON.parse(data);
		const good = cart.find((currentGood) => {
			return currentGood.id === req.body.id;
		});

		good.qty -= 1;
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send(JSON.stringify({
					result: 0
				}))
			} else {
				res.send(JSON.stringify({
					result: 1
				}))
			}
		})
	})
});

app.post('/plusOneItem', (req, res) => {
	fs.readFile('cart.json', 'utf-8', (err, data) => {
		const cart = JSON.parse(data);
		const good = cart.find((currentGood) => {
			return currentGood.id === req.body.id;
		});

		good.qty += 1;
		fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
			if (err) {
				res.send(JSON.stringify({
					result: 0
				}))
			} else {
				res.send(JSON.stringify({
					result: 1
				}))
			}
		})
	})
});

app.post('/addStat', (req, res) => {
	fs.readFile('stats.json', 'utf-8', (err, data) => {
		const stats = JSON.parse(data);
		const new_stat = req.body;

		stats.push(new_stat);
		fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
			if (err) {
				res.send(JSON.stringify({
					result: 0
				}))
			} else {
				res.send(JSON.stringify({
					result: 1
				}))
			}
		})
	})
});