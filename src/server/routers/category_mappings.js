const Express = require('express');
const router = Express.Router();
const CategoryMappings = require('../controllers/categories');

router.post('/', CategoryMappings.create);

module.exports = router;
