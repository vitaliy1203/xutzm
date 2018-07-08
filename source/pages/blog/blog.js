import './blog.scss';
import 'normalize.css';

import createMenu from '../../components/menu/menu.js';
var menu = createMenu(['Главная','индекс'], 'menu');
document.body.appendChild(menu);
console.log('blog');