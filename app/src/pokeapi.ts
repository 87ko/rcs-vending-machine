import Pokedex from 'pokedex-promise-v2'

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

const P = new Pokedex()

export class Poke {
	public static apiUrl = `/api/v2/pokemon/`
	static async get(num: number) {
		console.log(num)
		const pokeArr = this.createPokeArr(num)

		new Promise((resolve, reject) => {
			P.getResource(pokeArr)
				.then(async (pokes) => {
					const _pokeObjArr: PokeArrayObj[] = []
					//@ts-ignore
					pokes.forEach((poke) => {
						const pokeObj = {
							id: poke.id,
							name: poke.name,
							url: poke.sprites.front_default,
						}
						_pokeObjArr.push(pokeObj)
					})
					const pokeObjArr = await this.getText(_pokeObjArr)
					resolve(pokeObjArr)
				})
				.catch((err) => {
					throw new Error(err)
				})
		})
	}
	private static async getText(pokeObjArr: PokeArrayObj[]) {
		pokeObjArr.forEach(async (poke) => {
			const text = await P.getPokemonSpeciesByName(poke.name).then((res) => {
				const jaText = (res as Pokedex.PokemonSpecies).flavor_text_entries.filter((text: PokeTextResponse) => {
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
