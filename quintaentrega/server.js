const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

const products = [];

app.get('/', (req, res) => {
  res.render('form.ejs', { players: products.sort((a, b) => b.price - a.price) });
});

app.post('/productos', async (req, res) => {
  const { name, price, thumbnail } = req.body;
  products.push({ name, price, thumbnail });
  res.redirect('/');
});

app.listen(8080, (req, res) => console.log('Listening'));
