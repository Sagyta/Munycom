const server = require('./src/app.js')
const { conn } = require('./src/db.js');
//const { buildRole, buildCategory, buildSport, buildUser} = require('./src/Preload/index.js');

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => { 
  
  server.listen(PORT, () => {
    console.log('Servidor corriendo en 3001'); 
    //buildRole();
   // buildCategory();
    //buildSport();
    //buildUser();
  });
}); 