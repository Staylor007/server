const express = require('express');

const {PORT} = require('./config');

const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu.routes'); 
const authRoutes = require('./routes/auth.routes'); 
const reservaRoutes = require('./routes/reserva.routes'); 
const userRoutes = require('./routes/user.routes'); 
const ubicacionRoutes = require('./routes/ubicacion.routes'); 
const barRoutes = require('./routes/bar.routes'); 
const detreservaRoutes = require('./routes/detallereserva.routes'); 
const empleadoRoutes = require('./routes/empleado.routes'); 

const cors = require('cors'); 


const app = express();
const port = PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/upload', express.static('upload/'));
app.use('/api/menu', menuRoutes);
app.use('/api/reserva', reservaRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/auth', userRoutes); 
app.use('/api/location', ubicacionRoutes); 
app.use('/api/bar', barRoutes); 
app.use('/api/detreserva',detreservaRoutes); 
app.use('/api/empleado',empleadoRoutes); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});