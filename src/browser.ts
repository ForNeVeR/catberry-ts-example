import Catberry = require('catberry');
import TemplateEngine = require('catberry-jade');

var config = require('./config/environment.json');
var cat = Catberry.create(config);

TemplateEngine.register(cat.locator);
cat.startWhenReady();
