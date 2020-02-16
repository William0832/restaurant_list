// require package and data
const express = require('express');
const app = express();
exports.app = app;
const port = 3000;

const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json').results;

// setting express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setting static files
app.use(express.static('public'));

// setting routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList });
});

// show info. page (use req.params)
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render('show', { restaurant });
});

// search restaurants (use req.query)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.filter(item => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.includes(keyword)
    );
  });

  res.render('index', { restaurants, keyword });
});

// start sever and listen it
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
