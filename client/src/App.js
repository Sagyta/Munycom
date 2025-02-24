//eslint-disable react-hooks/exhaustive-deps;
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import News from './components/News';
import DetailNews from './components/NewsDetails';
import SeccionNews from './components/SeccionNews';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';
import NewsManagement from './admin/NewsManagement';
import CommentsManagement from './admin/CommentsManagement';
import UsersManagement from './admin/UsersManagement';

function PrivateRoute ({element}){
  const { isAuthenticated, isAdmin } = useSelector(state => state);
    return isAuthenticated && isAdmin ? element : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/news/:id" element={<DetailNews />} />
        <Route exact path='/SeccionNews' element={<SeccionNews />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/news" element={<NewsManagement />} />
        <Route path="/admin/comments" element={<CommentsManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;


/*import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions/actions';
import Home from './pages/Home'

const App = () => {
  const count = useSelector(state => state.count); // Leer el estado global
  const dispatch = useDispatch(); // Despachar acciones

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => dispatch(increment())}>Incrementar</button>
      <button onClick={() => dispatch(decrement())}>Decrementar</button>
      <Home />
    </div>
    
  );
};

export default App;*/
