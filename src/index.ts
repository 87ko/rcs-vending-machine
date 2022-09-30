import Pokedex from 'pokedex-promise-v2'
import 'bootstrap/dist/css/bootstrap.min.css'

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
		const pokeArr = []
		while (num > 0) {
			pokeArr.push(`${this.apiUrl}${num}`)
			num -= 1
		}
		return pokeArr
	}
}

Poke.get(4)

/**
 * View
 * 描画部分をつくる
 */
class View {
	static createHtml() {
		const target = document.getElementById('target')
		//ここでdivを作成する..
	}

	static control() {
		//コントロールボタンはここで
	}

	static animate() {
		//animationはここで
	}
}

/**
 * Controller
 * slider部分をつくろう
 */
class Controller {}
