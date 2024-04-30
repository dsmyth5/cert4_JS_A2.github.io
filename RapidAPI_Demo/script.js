//*RAPID API URL
// Dad Jokes
// https://rapidapi.com/KegenGuyll/api/dad-jokes

const url = 'https://dad-jokes.p.rapidapi.com/random/joke';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'efb328a641msh84387493fc152ccp1158a3jsnda799d2bf285',
		'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
	}
};

async function randomDadJoke() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}
randomDadJoke()