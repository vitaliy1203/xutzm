import './blog.scss';

import createMenu from '../../components/menu/menu.js';
var menu = createMenu(['Главная','индекс'], 'menu');
document.body.appendChild(menu);
console.log('blog');