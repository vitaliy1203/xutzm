import './index.scss';
import 'normalize.css';
const React = require('react');
const ReactDOM = require('react-dom');

import createMenu from '../../components/menu/menu.js';
var menu = createMenu(['Главная', 'Блог'], 'menu');
document.body.appendChild(menu);
console.log('index');


var h1 = React.createElement("h1", null, "hello world");
class HelloWorld extends React.Component {
    render() {
        return React.createElement("div", this.props, "hello my " + this.props.id);
    }
};

ReactDOM.render(
        React.createElement(
        "div",
        null,
        React.createElement(HelloWorld,{
            id:"dog",
            petName:"staff",
            petClass:"taksa"
        }),
        React.createElement(HelloWorld,{
            id:"cat",
            petName:"pushok",
            petClass:"cheshir"
        }),
        React.createElement(HelloWorld,{
            id:"burd",
            petName:"uuh",
            petClass:"sova"
        })
        ),
        document.getElementById("content")
        );