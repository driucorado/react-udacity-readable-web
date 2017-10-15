import * as CategoryApi from '../../api/CategoryApi'
import {RECEIVE_CATEGORIES} from "../types/index";


export const recieveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const fetchCategories = () => dispatch => (
    CategoryApi
        .getAll()
        .then(categories => dispatch(recieveCategories(categories)))
)