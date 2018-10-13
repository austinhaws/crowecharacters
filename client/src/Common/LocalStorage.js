export default {

	account: {
		getPhrase: () => localStorage.getItem('accountPhrase'),
		setPhrase: phrase => localStorage.setItem('accountPhrase', phrase),
	},
};
