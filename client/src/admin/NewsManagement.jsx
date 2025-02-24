import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews, updateNews } from "../redux/actions/actions";

export function NewsManagement() {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    
    const [editData, setEditData] = useState({ id: "", title: "", content: "" });
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteNews(id));
    };

    const handleEditClick = (n) => {
        setEditData(n);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNews(editData.id, editData));
        setShowEditForm(false);
    };

    return (
        <div>
            <h2>Gestión de Noticias</h2>
            <ul>
                {news.map((n) => (
                    <li key={n.id}>
                        {n.title}
                        <button onClick={() => handleEditClick(n)}>Editar</button>
                        <button onClick={() => handleDelete(n.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {showEditForm && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Editar Noticia</h3>
                    <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                    />
                    <textarea
                        name="content"
                        value={editData.content}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}

export default NewsManagement
