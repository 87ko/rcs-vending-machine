import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { Button } from './utils'
import { Poke, PokeArrayObj } from './poke'

import './style.css'

/**
 * View
 * 描画部分をつくる
 */
class View {
	static initHtml() {
		//pokemonの数だけボタンを作成
		pokemons.forEach((pokemon, i) => {
			document.getElementById('controlView')?.append(
				new Button({
					index: i,
					method: () => {
						Controller.sliderJump(i)
					},
				}).render()
			)
		})
	}
	static sliderHtml() {
		const view = document.getElementById('view')
		view!.classList.add('text-center')
		view!.innerHTML = `
			<div id="main" class="main" data-index="0"></div>
			<div id="extra" class="extra"></div>
		`
	}
	static infoHtml(pokemon: PokeArrayObj) {
		const info = document.getElementById('info')
		info!.classList.add('info')
		info!.innerHTML = `
			<h4>${pokemon.name}</h4>
			<p>${pokemon.text}</p>
		`
	}
}

/**
 * Controller
 * slider部分をつくろう
 */
class Controller {
	//indexを受け取ってinfo情報を返す
	static sliderJump(inputIndex: number) {
		// ここでsliderJumpつくる
		const main = document.getElementById('main')
		// currentIndex
		let index = parseInt(main!.getAttribute('data-index') as string)

		const currentElement = document.createElement('div')
		currentElement.innerHTML = `<img src="${pokemons[index].url}">`

		// nextIndex
		index = inputIndex
		const nextElement = document.createElement('div')
		nextElement.innerHTML = `<img src="${pokemons[index].url}">`
		// nextIndexをmainにセット
		main?.setAttribute('data-index', index.toString())

		// info
		View.infoHtml(pokemons[index])
		// animate
		this.animateMain(currentElement, nextElement, 'right')
	}
	private static animateMain(currentElement: HTMLElement, nextElement: HTMLElement, animationType: string) {
		// 描画処理
		const main = document.getElementById('main')
		const extra = document.getElementById('extra')

		extra!.innerHTML = ''
		extra!.append(currentElement)

		main!.innerHTML = ''
		main!.append(nextElement)

		main!.classList.add('expand-animation')
		extra!.classList.add('deplete-animation')

		const view = document.getElementById('view')

		if (animationType === 'right') {
			view!.innerHTML = ''
			view!.append(extra as HTMLElement)
			view!.append(main as HTMLElement)
		} else if (animationType === 'left') {
			view!.innerHTML = ''
			view!.append(main as HTMLElement)
			view!.append(extra as HTMLElement)
		}
	}
}

const pokemons = await Poke.get(4)
const main = async () => {
	const target = document.getElementById('app')
	target?.classList.add('mt-5')
	target!.innerHTML = `
		<div class="container">
			<div class="row d-flex justify-content-center" style="min-height:300px;">
				<div id="sliderView" class="col-10 col-md-7 p-5 bg-light">
					<div id="view"></div>
					<div id="info"></div>
				</div>
				<div id="controlView" class="col-10 col-md-5 p-2 d-flex flex-wrap align-items-center justify-content-start"></div>
			</div>
		</div>
	`

	console.log(pokemons)

	View.initHtml()
	View.sliderHtml()
}
main()
