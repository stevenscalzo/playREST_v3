import { connect } from 'mongoose';
import { Usuario } from '../auth/interfaces/login/login.interface';

connect('mongodb://localhost:27017/juegos');

Usuario.collection.drop();
let usu1 = new Usuario({
  login: 'maycalle',
  password: '12345678',
});
usu1.save();
let usu2 = new Usuario({
  login: 'rosamaria',
  password: '87654321',
});
usu2.save();
