import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, error } = useSelector(state => state);

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin){
                navigate("/admin/dashboard");
            }else{
                alert("no tienes permisos para acceder aqui")
            }
            
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(username, password));
    };

    return (
        <div>
            <h2>Login Admin</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AdminLogin;