import Pokedex from 'pokedex-promise-v2'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './css/style.css'

class Poke {
	static apiUrl = `/api/v2/pokemon/`
	static get(num: number) {
		const P = new Pokedex()
		const pokeArr = this.createPokeArr(num)

		P.getResource(pokeArr).then((res) => {
			console.log(res)
			return res
		})
	}
	private static createPokeArr(num: number): string[] {
		const pokeArr: string[] = []
		const ids = this.createId(num)
		ids.forEach((id) => {
			pokeArr.push(`${this.apiUrl}${id}`)
		})
		return pokeArr
	}
	private static createId(num: number): number[] {
		const randomId: number[] = []
		while (num > 0) {
			const id = Math.floor(Math.random() * 151)
			randomId.push(id)
			num -= 1
		}
		return randomId
	}
}

Poke.get(4)

/**
 * View
 * 描画部分をつくる
 */
class View {
	static createHtml() {
		//slider
		const sliderView = document.createElement('div')
		const main = document.createElement('div')
		const left = document.createElement('div')
		const right = document.createElement('div')

		sliderView.classList.add('col-12', 'col-md-7', 'p-2', 'bg-light')
		main.classList.add('bg-primary')
		left.classList.add('bg-dark') // 左に控えている
		right.classList.add('bg-dark') // 右に控えている

		sliderView.append(main)

		//controll
		const controlView = document.createElement('div')
		controlView.classList.add('col-12', 'col-md-5', 'p-2', 'd-flex', 'flex-wrap', 'justify-content-around')
		for (let i = 0; i < 4; i++) {
			const controlBtn = document.createElement('button')
			controlBtn.classList.add('btn')
			controlBtn.innerHTML = `${i + 1}`
			controlView.append(controlBtn)
		}

		//appendする..
		const target = document.getElementById('target')
		target?.classList.add('m-5', 'bg-primary')

		const innerDiv = document.createElement('div')
		innerDiv.classList.add('row')

		innerDiv?.append(sliderView)
		innerDiv?.append(controlView)

		target?.append(innerDiv)
	}

	private static controlButton() {
		//コントロールボタンはここで
	}

	static animateMaker() {
		//animationはここで
	}
}

View.createHtml()

/**
 * Controller
 * slider部分をつくろう
 */
class Controller {}
