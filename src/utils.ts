type ButtonProps = {
	index: number
	method: () => void
}

export class Button {
	button: HTMLElement
	constructor(props: ButtonProps) {
		this.button = document.createElement('button')
		this.button.classList.add('btn')
		this.button.id = `${props.index + 1}`
		this.button.innerHTML = `${props.index + 1}`
		this.button.onclick = props.method
	}
	render() {
		return this.button
	}
}
