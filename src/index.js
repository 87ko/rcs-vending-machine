import Pokedex from 'pokedex-promise-v2';
import 'bootstrap/dist/css/bootstrap.min.css';
var Poke = /** @class */ (function () {
    function Poke() {
    }
    Poke.get = function (num) {
        var P = new Pokedex();
        var pokeArr = this.createPokeArr(num);
        P.getResource(pokeArr).then(function (res) {
            console.log(res);
            return res;
        });
    };
    Poke.createPokeArr = function (num) {
        var pokeArr = [];
        while (num > 0) {
            pokeArr.push("".concat(this.apiUrl).concat(num));
            num -= 1;
        }
        return pokeArr;
    };
    Poke.apiUrl = "/api/v2/pokemon/";
    return Poke;
}());
Poke.get(4);
/**
 * View
 * 描画部分をつくる
 */
var View = /** @class */ (function () {
    function View() {
    }
    View.createHtml = function () {
        var target = document.getElementById('target');
        //ここでdivを作成する..
    };
    View.control = function () {
        //コントロールボタンはここで
    };
    View.animate = function () {
        //animationはここで
    };
    return View;
}());
/**
 * Controller
 * slider部分をつくろう
 */
var Controller = /** @class */ (function () {
    function Controller() {
    }
    return Controller;
}());
