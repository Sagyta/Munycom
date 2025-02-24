import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUser } from "../redux/actions/actions";

export function UsersManagement() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const [editData, setEditData] = useState({ id: "", username: "", email: "" });
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEditClick = (u) => {
        setEditData(u);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(editData.id, editData));
        setShowEditForm(false);
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.username} - {u.email}
                        <button onClick={() => handleEditClick(u)}>Editar</button>
                        <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {showEditForm && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Editar Usuario</h3>
                    <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleEditChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}
export default UsersManagement
