import * as CategoryApi  from '../../api/CategoryApi'

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const RECIEVE_WIKI_INFO = 'RECIEVE_WIKI_INFO'

export const recieveCategories = categories => ({
  type: RECIEVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  CategoryApi
      .getAll()
      .then(categories => dispatch(recieveCategories(categories)))
)