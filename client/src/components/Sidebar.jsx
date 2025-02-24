import React from 'react';
import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';


const Sidebar = () => {
  // Acceder al estado de Redux correctamente
  const news = useSelector(state => state.news || []);

  return (
    <aside>
      <h2>Últimas Noticias</h2>
      <ul>
        {news.length > 0 ? (
          news.map(newsItem => (
            <li key={newsItem.id}>{newsItem.title}</li>
          ))
        ) : (
          <p>No hay noticias disponibles</p>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;

/*const Sidebar = () => {
  const newsList = useSelector(state => state.news.newsList);

  return (
    <div className="sidebar">
      <h3>Lista de Noticias</h3>
      <ul>
        {newsList.map(news => (
          <li key={news.id}>
            <Link to={`/${news.id}`}>{news.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;*/