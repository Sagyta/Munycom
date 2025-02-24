import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/actions/actions";
import { useNavigate, NavLink } from "react-router-dom";
import "./css/AdminDashboard.css"; // Asegúrate de crear este archivo para los estilos

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate("/admin/login");
    };

    return (
        <div className="admin-container">
            {/* Menú lateral */}
            <nav className="admin-sidebar">
                <h2>Panel de Administración</h2>
                <ul>
                    <li>
                        <NavLink to="/admin/news">Gestión de Noticias</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/comments">Gestión de Comentarios</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users">Gestión de Usuarios</NavLink>
                    </li>
                </ul>
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </nav>

            {/* Contenido principal */}
            <div className="admin-content">
                <h3>Bienvenido al Panel de Administración</h3>
                <p>Selecciona una opción del menú lateral.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;