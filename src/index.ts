import Pokedex from 'pokedex-promise-v2'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './css/style.css'

type PokeTextResponse = {
	flavor_text: string
	language: { name: string; url: string }
	version: { name: string; url: string }
}
type PokeArrayObj = {
	id: string
	name: string
	url: string
	text?: string
}

class Poke {
	static apiUrl = `/api/v2/pokemon/`
	static P = new Pokedex()
	static async get(num: number) {
		const pokeArr = this.createPokeArr(num)

		// return new Promise((resolve, reject) => {
		return this.P.getResource(pokeArr)
			.then(async (pokes) => {
				const _pokeObjArr: PokeArrayObj[] = []
				pokes.forEach((poke) => {
					const pokeObj = {
						id: poke.id,
						name: poke.name,
						url: poke.sprites.front_default,
					}
					_pokeObjArr.push(pokeObj)
				})
				const pokeObjArr = await this.getText(_pokeObjArr)
				return pokeObjArr
			})
			.catch((err) => {
				throw new Error(err)
			})
	}
	static async getText(pokeObjArr: PokeArrayObj[]) {
		pokeObjArr.forEach(async (poke) => {
			const text = await this.P.getPokemonSpeciesByName(poke.name).then((res) => {
				const jaText = res.flavor_text_entries.filter((text: PokeTextResponse) => {
					return text.language.name.includes('ja') && text.version.name === 'x'
				}) as PokeTextResponse[]
				return jaText[0].flavor_text
			})
			poke.text = text
		})
		return pokeObjArr
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
			if (!randomId.includes(id) || !id) {
				randomId.push(id)
				num -= 1
			}
		}
		return randomId
	}
}

const main = async () => {
	const pokemon = await Poke.get(4)
	console.log(pokemon)
}
main()

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
