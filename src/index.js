import Pokedex from 'pokedex-promise-v2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/style.css';
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
        var _this = this;
        var pokeArr = [];
        var ids = this.createId(num);
        ids.forEach(function (id) {
            pokeArr.push("".concat(_this.apiUrl).concat(id));
        });
        return pokeArr;
    };
    Poke.createId = function (num) {
        var randomId = [];
        while (num > 0) {
            var id = Math.floor(Math.random() * 151);
            if (randomId.indexOf(id) < 0) {
                randomId.push(id);
                num -= 1;
            }
        }
        return randomId;
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
        //slider
        var sliderView = document.createElement('div');
        var main = document.createElement('div');
        var left = document.createElement('div');
        var right = document.createElement('div');
        sliderView.classList.add('col-12', 'col-md-7', 'p-2', 'bg-light');
        main.classList.add('bg-primary');
        left.classList.add('bg-dark'); // 左に控えている
        right.classList.add('bg-dark'); // 右に控えている
        sliderView.append(main);
        //controll
        var controlView = document.createElement('div');
        controlView.classList.add('col-12', 'col-md-5', 'p-2', 'd-flex', 'flex-wrap', 'justify-content-around');
        for (var i = 0; i < 4; i++) {
            var controlBtn = document.createElement('button');
            controlBtn.classList.add('btn');
            controlBtn.innerHTML = "".concat(i + 1);
            controlView.append(controlBtn);
        }
        //appendする..
        var target = document.getElementById('target');
        target === null || target === void 0 ? void 0 : target.classList.add('m-5', 'bg-primary');
        var innerDiv = document.createElement('div');
        innerDiv.classList.add('row');
        innerDiv === null || innerDiv === void 0 ? void 0 : innerDiv.append(sliderView);
        innerDiv === null || innerDiv === void 0 ? void 0 : innerDiv.append(controlView);
        target === null || target === void 0 ? void 0 : target.append(innerDiv);
    };
    View.controlButton = function () {
        //コントロールボタンはここで
    };
    View.animateMaker = function () {
        //animationはここで
    };
    return View;
}());
View.createHtml();
/**
 * Controller
 * slider部分をつくろう
 */
var Controller = /** @class */ (function () {
    function Controller() {
    }
    return Controller;
}());
