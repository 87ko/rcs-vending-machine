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
		// const tempPokeArr = [
		// 	{
		// 		id: 36,
		// 		name: 'clefable',
		// 		url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png',
		// 		text: '１キロさきで　おちた　ハリの　おとも\nききわける　すぐれた　みみを　もつ。\nしずかな　やまおくに　すんでいる。',
		// 	},
		// 	{
		// 		id: 16,
		// 		name: 'pidgey',
		// 		url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
		// 		text: 'もりや　はやしに　おおく　ぶんぷ。\nちじょうでも　はげしく　はばたいて\nすなを　かけたりする。',
		// 	},
		// 	{
		// 		id: 6,
		// 		name: 'charizard',
		// 		url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
		// 		text: 'くちから　しゃくねつの　ほのおを\nはきだすとき　しっぽの　さきは\nより　あかく　はげしく　もえあがる。',
		// 	},
		// 	{
		// 		id: 40,
		// 		name: 'wigglytuff',
		// 		url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png',
		// 		text: '２ひき　よりそいあうと　おたがいの\nけがわが　きもちよすぎて\nはなれられなく　なってしまう。',
		// 	},
		// 	{
		// 		id: 40,
		// 		name: 'wigglytuff',
		// 		url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png',
		// 		text: '２ひき　よりそいあうと　おたがいの\nけがわが　きもちよすぎて\nはなれられなく　なってしまう。',
		// 	},
		// ]
		// return tempPokeArr
		/////////

		const pokeArr = this.createPokeArr(num)

		return new Promise((resolve, reject) => {
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
