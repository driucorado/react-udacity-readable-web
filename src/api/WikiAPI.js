import uuid from 'uuid/v4';

const headers = {
  'Accept': 'application/json'
}

export const getWikiPage = (query) => 
  fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${query}&format=json&prop=info`, { headers, mode: 'no-cors' })
    .then(res => res.json())
    .then(data => data.query.pages)

export const getWikiPageData = (page) => 
	fetch(`https://en.wikipedia.org/w/api.php?action=parse&pageid=${page}&format=json`, { headers, mode: 'no-cors' })
    .then(res => res.json())
    .then(data => data.parse.text)

