const initialState = {
    news: [],
    newsDetail: {},
    comment:[],
    isAuthenticated: false,
    isAdmin:false,
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // GET NOTICIAS
        case 'ALL_NEWS':
            return {
                ...state,
                news: payload,
            };
        case 'DETAIL_NEWS':
            return {
                ...state,
                newsDetail: payload
            };
        case 'CLEAR_MEMBER_DETAIL':
			return {
				...state,
				memberDetail: {},
			};
        case 'CLEAR_COMMENTS':
                return {
                    ...state,
                    comments: [],
                };
        case 'CLEAR_PAGE':
			return {
				...state,
				memberDetail: {},
				newsDetail: {},
				comment: [],
			};
        case 'SEARCH_SEARCH':
			//functión para buscar en el estado
			return {
				...state,
				news: payload,
			};
        case 'GET_COMMENTS':
            return {
             ...state,
            comment: payload
      };

        case 'ADD_COMMENT':
            return {
                ...state,
                comment: Array.isArray(state.comment)? [...state.comment, payload] : [payload],
      };
      //PANEL ADMIN - AUTENTICACION ADMIN
      case 'ADMIN_LOGIN_SUCCESS':
            return {
            ...state,
            isAuthenticated: true,
            isAdmin: payload.isAdmin,
        };
        case "ADMIN_LOGIN_FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                error: payload,
            };
        case 'ADMIN_LOGOUT':
            return {
            ...state,
            isAuthenticated:false,
            isAdmin: false
        };
// NOTICIAS Y COMENTARIOS
        case 'ADD_NEWS':
            return {
            ...state,
            news: [...state.news, payload], // Agregar una noticia
        };

        case 'EDIT_NEWS':
            return {
            ...state,
            news: state.news.map(newsItem =>
                newsItem.id === payload.id ? { ...newsItem, ...payload } : newsItem
            ),
        };

        case 'DELETE_NEWS':
            return {
            ...state,
            news: state.news.filter(newsItem => newsItem.id !== payload),
        };
        case 'DELETE_COMMENT':
            return {
                ...state,
                comments: state.comment.filter(comment => comment.id !== payload)
            }
        default:
            return state;
    }
};

export default rootReducer;