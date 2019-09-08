const axios = require('axios');

axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt')
.then(res => {
    const word = 'apart';
    
})
.catch(err => console.log('Could not fetch the dictionary'))
