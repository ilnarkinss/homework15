const rootElem = document.querySelector('#root');
const cardsElem = document.querySelector('#cards');
const textElem = document.querySelector('#selecttext');
const translateElem = document.querySelector('#selecttranslate');
const colorElem = document.querySelector('#selectcolor');
const searchElem = document.querySelector('#srchinpt')

let cardsLst = JSON.parse(localStorage.cardsLst || '[]');

class Post{
	constructor(text, translatetext ,color){
		this.text = text;
		this.translatetext = translatetext;
		this.color = color;
		this.translate = false;
	}

	get(){
		const cardElem = document.createElement('div');
 		const gentextElem = document.createElement('p');
		const crossElem = document.createElement('div');

		cardElem.classList.add('card');
		gentextElem.classList.add('text');
		crossElem.classList.add('cross');

		crossElem.innerText = '❌';
		gentextElem.innerText = this.text;
		cardElem.style.backgroundColor = this.color;

		cardElem.append(gentextElem, crossElem);

		crossElem.addEventListener('click', ()=>{
			event.preventDefault();
			cardsLst = cardsLst.filter(fElem => fElem.text !== this.text);
			render(cardsLst);
		});

		cardElem.addEventListener('dblclick', ()=>{
			this.translate = !this.translate;
			if (!this.translate){
				gentextElem.innerText = this.translatetext;
			}else{
				gentextElem.innerText = this.text;
			}
		});
		return cardElem;
	}
}

function render(rendelem) {
	cardsElem.innerText = '';
	const postPosts = rendelem.map(({text, translatetext, color}) => new Post(text, translatetext, color));
	cardsElem.append(...postPosts.map(p => p.get()));
	localStorage.setItem('cardsLst', JSON.stringify(rendelem));
}


searchElem.addEventListener('input', event=>{
	event.preventDefault();
	let srchlst = cardsLst.filter(srchElem => srchElem.text.startsWith(event.target.value));
	console.log(srchlst);
	render(srchlst);
})


addEventListener('submit', event=>{
	event.preventDefault();
	if (selecttext.value !== '' & selecttranslate.value !== ''){
		const {selecttext, selecttranslate, selectcolor} = event.target;
		cardsLst.push({
			text: selecttext.value, 
			translatetext: selecttranslate.value,
			color: selectcolor.value,
		});
		render(cardsLst);
	}else{
		return
	}
})
render(cardsLst);