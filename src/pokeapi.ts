// import Pokedex from 'pokedex-promise-v2'

type PokeTextResponse = {
	flavor_text: string
	language: { name: string; url: string }
	version: { name: string; url: string }
}

export type PokeArrayObj = {
	id: number
	name: string
	url: string
	text?: string
}

export const Poke = async (num: number): Promise<PokeArrayObj[]> => {
	const apiUrl = `https://pokeapi.co/api/v2/pokemon`
	const pokeIdArr = createId(num)

	const pokeObjArr = await loadPokemons()
	return pokeObjArr

	async function loadPokemons(): Promise<PokeArrayObj[]> {
		const _pokeObjArr = []
		const res = await Promise.all<PokeArrayObj>(
			pokeIdArr.map(async (pokeId) => {
				let poke = await getPokemon(pokeId)
				let pokeObj = await setPokemonInfo(poke)
				return pokeObj
			})
		)
		_pokeObjArr.push(...res)
		return _pokeObjArr
	}
	function getPokemon(pokeId: number): Promise<PokeArrayObj> {
		return new Promise((resolve, reject) => {
			fetch(`${apiUrl}/${pokeId}`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data)
					resolve(data)
				})
		})
	}
	async function setPokemonInfo(poke) {
		const text = await getText(poke.species.url)
		const pokeObj = {
			id: poke.id,
			name: poke.name,
			url: poke.sprites.front_default,
			text: text,
		}
		return pokeObj
	}
	function getText(pokeUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fetch(pokeUrl)
				.then((response) => response.json())
				.then((data) => {
					const jaText = data.flavor_text_entries.filter((text: PokeTextResponse) => {
						return text.language.name.includes('ja') && text.version.name === 'x'
					})
					const [kana, _kanji] = jaText
					resolve(kana.flavor_text)
				})
		})
	}
	function createId(num: number): number[] {
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
