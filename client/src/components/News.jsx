import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import './css/News.css'


export default function Noticias({ title, subtitle, videoLink, id}){
  const dispatch = useDispatch()
  const noticia = useSelector(state=> state.news);

  return (
    <div className='news' key={title}>
      {videoLink ? (
        <iframe
          width="100%"
          height="250px"
          src={videoLink.replace("watch?v=", "embed/")} // Convierte el link de YouTube a formato embed
          title="Video Noticia"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
          alt="Imagen no encontrada"
          className="imgNews"
        />
      )}
      <h2 className="titleNews"> {title.slice(0,60) + '...'} </h2>
      <h3 className="subtitleNews">
        {subtitle.split(' ').slice(0, 19).join(' ') + ' ...'} </h3>
        <Link to={`/news/${id}`}>
          <button>
            <span>Leer Más...</span>
          </button>
        </Link>
    </div>
  )
}