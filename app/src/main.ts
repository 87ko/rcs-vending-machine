import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { Button } from './utils'
import { PokeArrayObj, pokemons } from './poke'
// import { pokemons } from './pokeapi'
// import type { PokeArrayObj } from './pokeapi'

import './style.css'

/**
 * View
 * 描画部分をつくる
 */
class View {
	static initHtml() {
		const target = document.getElementById('app')
		target!.classList.add('mt-5')
		target!.innerHTML = `
		<div class="container">
			<div class="row d-flex justify-content-center" style="min-height:300px;">
				<div id="sliderView" class="h-100 col-10 col-md-7 p-5 bg-primary">
					<div id="view" class="h-60"></div>
					<div id="info" class="h-40"></div>
				</div>
				<div id="controlView" class="col-10 col-md-5 p-2 d-flex flex-wrap align-items-center justify-content-start"></div>
			</div>
		</div>
		`
		//pokemonの数だけボタンを作成
		pokemons.forEach((_pokemon, i) => {
			document.getElementById('controlView')!.append(
				new Button({
					index: i,
					method: () => {
						Controller.sliderJump(i)
					},
				}).render()
			)
		})
		return
	}
	static sliderHtml() {
		const view = document.getElementById('view')
		view!.classList.add('text-center', 'view', 'overflow-hiddens')
		view!.innerHTML = `
			<div id="main" class="main full-width full-height" data-index="-1"></div>
			<div id="extra" class="extra full-width full-height"></div>
		`
		return
	}
}

/**
 * Controller
 * slider部分をつくろう
 */
class Controller {
	//indexを受け取ってinfo情報を返す
	static setInfo(pokemon: PokeArrayObj) {
		const info = document.getElementById('info')
		info!.classList.add('info')
		info!.innerHTML = `
			<h4>${pokemon.name}</h4>
			<p>${pokemon.text}</p>
		`
		return
	}
	static sliderJump(inputIndex: number) {
		// ここでsliderJumpつくる
		const main = document.getElementById('main')
		const extra = document.getElementById('extra')

		let index = main!.getAttribute('data-index') as unknown as number
		console.log(index)
		if (index === inputIndex) {
			//なにもしない
		}
		const type = this.animationType(index, inputIndex)
		console.log(index, inputIndex, type)
		//img割当
		const mainImg = document.createElement('img')
		const extraImg = document.createElement('img')
		mainImg.src = index >= 0 ? `${pokemons[index].url}` : ''
		extraImg.src = `${pokemons[inputIndex].url}`
		//data-index入替
		main!.setAttribute('data-index', inputIndex.toString())
		//animation
		return this.animateMain(main!, extra!, mainImg, extraImg, type)
	}
	static animationType(leftIndex: number, inputIndex: number) {
		const length = pokemons.length
		const right = (length + inputIndex - leftIndex) % length
		const left = leftIndex - inputIndex > 0 ? leftIndex - inputIndex : leftIndex - inputIndex + length
		return right - left >= 0 ? 'left' : 'right'
	}
	static animateMain(
		main: HTMLElement,
		extra: HTMLElement,
		mainImg: HTMLElement,
		extraImg: HTMLElement,
		animationType: string
	) {
		// 描画処理
		//img入替
		main!.innerHTML = ''
		extra!.innerHTML = ''
		main!.append(mainImg)
		extra!.append(extraImg)

		main.classList.add('deplete-animation')
		extra.classList.add('expand-animation')

		const view = document.getElementById('view')

		if (animationType === 'right') {
			view!.append(main)
			view!.append(extra)
		} else {
			view!.append(extra)
			view!.append(main)
		}
	}
}

async function main() {
	// const pokemons = (await Poke.get(4)) as PokeArrayObj[]
	View.initHtml()
	View.sliderHtml()
}
main()
