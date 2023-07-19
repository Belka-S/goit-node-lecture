const whisky = require('../../data/whisky.json');

const getAll = (req, res) => {
  res.render('index', { whisky });
};

module.exports = getAll;
