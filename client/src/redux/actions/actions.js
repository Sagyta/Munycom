import axios from "axios";
import swal from "sweetalert2";

import { 
    ALL_NEWS,
    DETAIL_NEWS,
	//UPDATE_NEWS,
    CLEAR_PAGE,
    CLEAR_MEMBER_DETAIL,
    CLEAR_COMMENTS,
   // UPDATE_COMMENT,
    DELETE_COMMENT,
	SEARCH_SEARCH,
	GET_COMMENTS,
	ADD_COMMENT,
	//ADMIN_LOGIN_SUCCESS, 
	//ADMIN_LOGIN_FAILURE, 
	//ADMIN_LOGOUT,
	GET_USERS,
} from './datatypes';


// Noticias
export function getNews(){
    return async (dispatch) =>{
        try{
            let {data} = await axios.get("http://localhost:3001/news");
            //console.log('Noticias recibidas:', data);
            return dispatch({ type: ALL_NEWS, payload: data});
        }catch (error){
           // ✅ Guardarlo en otra variable
            console.error("Error al encontrar la noticia", error);
        }
    };
}

export function detailNews(id) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`http://localhost:3001/news/${id}`
			);
			dispatch({
				type: DETAIL_NEWS,
				payload: data,
			});
		} catch (error) {
			alert(error.response.data);
		}
	};
}

/*export function updateNews(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(
				`http://localhost:3001/news/${id}`,
				input
			);
			return dispatch({ type: UPDATE_NEWS, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}*/

export function filterNews(title) {
	return async (dispatch) => {
		try {
			let { data } = await axios.get(
				`http://localhost:3001/news?title=${title}`
			);
			return dispatch({ type: SEARCH_SEARCH, payload: data });
		} catch (error) {
			swal({
				title: "No se encontró su busqueda.",
				text: "Intente escribir un nombre de una noticia o asegurese de que este bien escrito.",
				icon: "error",
				button: "Ok.",
			});
		}
	};
}

// fin noticias

// comentarios

/*export function getComments(newsId) {
	return async function (dispatch) {
	  try {
		const {data} = await axios.get(`http://localhost:3001/comment/${newsId}`);
		console.log("comentarios del front" , data)
		dispatch({ type: GET_COMMENTS, payload: data });
	  } catch (error) {
		console.error("Error obteniendo comentarios:", error);
	  }
	};
  }*/
  export function getComments(newId){
	return async (dispatch)=>{
		try{
			let url = newId ? `http://localhost:3001/comment?newId=${newId}` 
			: `http://localhost:3001/comment`;

			let {data} = await axios.get(url);
			dispatch({type: GET_COMMENTS, payload: data})
		}catch(error){
			console.error("Error al obtener comentario", error)
		}
	}
  }
  
  export function addComment(newsId, comment) {
	return async function (dispatch) {
	  try {
		const {data} = await axios.post(`http://localhost:3001/comment/comentar/${newsId}`, comment);
		dispatch({ type: ADD_COMMENT, payload: data });
	  } catch (error) {
		console.error("Error agregando comentario:", error);
	  }
	};
  }

/*export function updateComment(id, input) {
	return async (dispatch) => {
		try {
			let { data } = await axios.put(
				`http://localhost:3001/comment/${id}`,
				input
			);
			return dispatch({ type: UPDATE_COMMENT, payload: data });
		} catch (error) {
			alert(error.response.data);
		}
	};
}*/

// fin comentarios

export function clearMemberDetail() {
	return { type: CLEAR_MEMBER_DETAIL };
}

export const clearPage = () => {
	return {
		type: CLEAR_PAGE,
	};
};

export function clearComments() {
	return { type: CLEAR_COMMENTS };
}

// PANEL ADMIN

export const loginAdmin = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:3001/admin/login", {
            username,
            password,
        });

        dispatch({
            type: "ADMIN_LOGIN_SUCCESS",
            payload: { isAdmin: response.data.isAdmin },  // Guardamos el isAdmin
        });

        localStorage.setItem("token", response.data.token);  // Guardamos el token

    } catch (error) {
        dispatch({
            type: "ADMIN_LOGIN_FAILURE",
            payload: error.response?.data?.message || "Error al iniciar sesión",
        });
    }
};

export const logoutAdmin = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
};

//SECCION USUARIOS
export function getUsers (){
	return async (dispatch) =>{
		try{
			let {data} = await axios.get('http://localhost:3001/user');
			return dispatch({type: GET_USERS, payload: data});
		}catch(error){
			console.error('no se encontraron usuarios', error)
		}
	};
}

export function updateUser(id, updateData){
	return async(dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/user/${id}`, updateData);
			dispatch(getUsers());
		}catch(error){
			console.error("Error al actualizar usuario", error);
		}
	}
}

export function deleteUser(id){
	return async (dispatch)=>{
		try{
			await axios.delete(`http://localhost:3001/user/${id}`);
			dispatch(getUsers());
		}catch(error){
			console.error("Error al eliminar usuario", error)
		}
	}
}

//SECCION NOTICIAS
export function updateNews(id, updateData){
	return async (dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/news/${id}`, updateData);
			dispatch(getNews());
		}catch(error){
			console.error("Error al actualizar la noticia", error);
		}
	}
}

export function deleteNews(id){
	return async (dispatch)=>{
		try{
			await axios.delete(`http://localhost:3001/news/${id}`);
			dispatch(getNews());
		}catch(error){
			console.error("Error al eliminar noticia", error)
		}
	}
}

//SECCION COMENTARIOS
export function updateComment(id, updateData){
	return async (dispatch)=>{
		try{
			await axios.put(`http://localhost:3001/comment/${id}`, updateData);
			dispatch(getComments());
		}catch (error){
			console.error("Error al actualizar comentario", error);
		}
	}
}

export function deleteComment(commentId, newId) {
	return async (dispatch) => {
		try {
			await axios.delete(`http://localhost:3001/comment/${commentId}`);
			return dispatch({ type: DELETE_COMMENT, payload: commentId }, getComments(newId))
			//dispatch(getComments(newId));
		} catch (error) {
			alert(error.response.data);
		}
	};
}