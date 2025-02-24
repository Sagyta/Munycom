import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, deleteComment, updateComment } from "../redux/actions/actions";

export function CommentsManagement() {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment);

    const [editData, setEditData] = useState({ id: "", comment: "" });
    const [showEditForm, setShowEditForm] = useState(false);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch, reload]);

    /*const handleDelete = (id) => {
        dispatch(deleteComment(id));
        setReload(prev=>!prev);
    };*/
    const handleDelete = async(id)=>{
        const confirmDelete = window.confirm("")
    }

    const handleEditClick = (c) => {
        setEditData(c);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, comment: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateComment(editData.id, editData));
        setShowEditForm(false);
    };

    return (
        <div>
            <h2>Gestión de Comentarios</h2>
            <ul>
                {comments.map((c) => (
                    <li key={c.id}>
                        {c.comment}
                        <button onClick={() => handleEditClick(c)}>Editar</button>
                        <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {showEditForm && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Editar Comentario</h3>
                    <textarea
                        name="comment"
                        value={editData.comment}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}

export default CommentsManagement
