import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../redux/actions/actions'; // Importa la acción para cargar las noticias
import './css/Home.css';
import Footer from './Footer';
import Navbar from './NavBar';
import News from './News'
import NewsCarousel from "./NewsCarousel";

const Home = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);  // Accede al estado global de noticias

    // Simulamos una llamada para obtener noticias
    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
      <div class="container">
  <header>Encabezado
  <Navbar />
  </header>
  {/* aca iria los banners */}
  
  <div>
  <NewsCarousel news={news} />
  </div>
  <div className="main">
    {/*<div className="column left">IzquierdaIzquierda/IzquierdaIzquierda</div>*/}
    <div className="column center" >Centro
    <h1 >Últimas noticias del club</h1>
    <section id="noticias">            
            <div className='newContainer' >
                {news?.slice(0,4).map(e=>{
                  return(
                    <div className='newsItem' key={e.id}>
                    <News                      
                      id={e.id}
                      videoLink={e.videoLink}
                      title={e.title}
                      subtitle={e.subtitle}
                      />
                      </div>
                  )
                })}
              </div>
            </section>
            {/* aca termina noticias */}
    </div>
    <div className="column right" >Derecha</div>
  </div>
  <div>
    <img src='https://cdn.pixabay.com/photo/2015/09/14/07/50/banner-939243_640.jpg' />
  </div>
  
  <footer><Footer /></footer>
</div>
    );
};

export default Home;