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
	static initHtml(pokemonItems: PokeArrayObj[]) {
		//pokemonの数だけボタンを作成
		for (let i = 0; i < pokemonItems.length; i++) {
			document.getElementById('controlView')?.append(
				new Button({
					index: i,
					method: () => {
						Controller.infoCon(pokemonItems[i])
						Controller.sliderJump(i)
					},
				}).render()
			)
		}
	}
	//indexを受け取ってview情報を返す
	static sliderHtml() {
		const view = document.getElementById('view')
		view!.classList.add('text-center')
		view!.innerHTML = `
			<div id="main" class="main"></div>
			<div id="extra" class="extra"></div>
		`
	}
}

/**
 * Controller
 * slider部分をつくろう
 */
class Controller {
	//indexを受け取ってinfo情報を返す
	static infoCon(pokemon: PokeArrayObj) {
		const info = document.getElementById('info')
		info!.classList.add('info')
		info!.innerHTML = `
			<h4>${pokemon.name}</h4>
			<p>${pokemon.text}</p>
		`

		const img = document.createElement('img')
		img.src = pokemon.url
		this.animateMain(img)
	}
	static sliderJump(index: number) {
		// ここでsliderJumpつくる
	}
	private static animateMain(currentEle: HTMLElement) {
		// 描画処理
		const main = document.getElementById('main')
		const extra = document.getElementById('extra')

		extra!.innerHTML = ''
		extra!.append('')

		main!.innerHTML = ''
		main!.append(currentEle)
	}
}

const main = async () => {
	const target = document.getElementById('app')
	target?.classList.add('mt-5')
	target!.innerHTML = `
		<div class="container">
			<div class="row" style="min-height:300px">
				<div id="sliderView" class="col-12 col-md-7 p-5 bg-light">
					<div id="view"></div>
					<div id="info"></div>
				</div>
				<div id="controlView" class="col-12 col-md-5 p-2 d-flex flex-wrap align-items-center justify-content-start"></div>
			</div>
		</div>
	`
	const pokemonItems = await Poke.get(4)
	console.log(pokemonItems)

	View.initHtml(pokemonItems)
	View.sliderHtml()
}
main()
