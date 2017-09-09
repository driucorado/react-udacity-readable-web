// import wikipedia from 'wikipedia-js'

import * as CategoryAPI  from '../../api/CategoryAPI'
import * as WikiAPI from '../../api/WikiAPI'
import * as PostAPI from '../../api/PostAPI'

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const RECIEVE_WIKI_INFO = 'RECIEVE_WIKI_INFO'


export const recieveCategories = categories => ({
  type: RECIEVE_CATEGORIES,
  categories
});

export const recieveWikiInfo = dataWiki => ({
  type: RECIEVE_WIKI_INFO,
  dataWiki
});

export const fetchCategories = () => dispatch => (
  CategoryAPI
      .getAll()
      .then(categories => dispatch(recieveCategories(categories)))
)

// export const fetchWikiInfo = (query) => dispatch => {
// 	WikiAPI.getWikiPage(query)
// 	.then(page => {
// 		console.log(page)
// 	})
// }
