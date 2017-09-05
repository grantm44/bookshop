'user strict'
//STEP 3 define reducers
export function booksReducers(state={
	books:[]
}, action){
	switch(action.type){
		case "GET_BOOKS":
			return {...state, books: [...action.payload]}
		case "POST_BOOK":
			return {...state, books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style: 'success', validation:'success'}
			break;
		case "DELETE_BOOK":
			/*const booksArr = [...state.books]
			const deletedArr = booksArr.filter(book => book._id !== action.payload) */
			return { books: [...state.books].filter(book => book._id != action.payload) }
			break;
		case "UPDATE_BOOK": 
			const index = [...state.books].findIndex(book => book._id === action.payload._id)
			const array = [...state.books]
			array[index].title = action.payload.title
			return { books: array }
			break;
		case "POST_BOOK_REJECTED":
			return {...state, msg: 'Please try again', style: 'danger', validation: 'error'}
		case "RESET_BUTTON":
			return {...state, msg: null, style: 'primary', validation: null}
	}
	return state
}