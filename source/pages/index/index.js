import './index.scss';
import 'normalize.css';

import createMenu from '../../components/menu/menu.js';
var menu = createMenu(['Главная','Блог'], 'menu');
document.body.appendChild(menu);
console.log('index');
console.log($);
console.log(jQuery);