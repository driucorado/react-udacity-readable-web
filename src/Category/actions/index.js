import * as CategoryAPI  from '../../api/CategoryAPI'

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const RECIEVE_WIKI_INFO = 'RECIEVE_WIKI_INFO'

export const recieveCategories = categories => ({
  type: RECIEVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  CategoryAPI
      .getAll()
      .then(categories => dispatch(recieveCategories(categories)))
)