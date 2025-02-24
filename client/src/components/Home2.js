<div>
          
          <div className={S.contenedorGeneral}>
            <div className={S.carouselImg}>{/* <GaleriaImg /> */}</div>
          {/* aca empieza noticias */}
            <section id="noticias">
            <h1 className={S.titleNews}>Últimas noticias del club</h1>
            <div className={S.contenidoCentral}>
                {news?.slice(0,4).map(e=>{
                  return(
                    <News
                      key={e.id}
                      id={e.id}
                      image={e.image}
                      title={e.title}
                      subtitle={e.subtitle}
                      />
                  )
                })}
              </div>
            </section>
            {/* aca termina noticias */}
            </div>
        </div>