var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


var app = express();
app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
  host: 'localhost',
  user: 'myadmin',
  password: 'udgvirtual',
  database: 'logistic'
});

conexion.connect(function(error){
 if (error) {
   throw error;

 } else {
   console.log("YEAH!");

 }

});

app.get('/', function(req,res){
      res.send('/');
});
//Mostrar resultados de DB
app.get('/api/cliente', (req,res)=>{
  conexion.query('SELECT * FROM ecClient', (error, filas)=>{
    if (error) {
      throw error;

    }else{
      res.send(filas);
    }

  })
});
//Escribir datos en DB
app.post('/api/cliente', (req,res)=>{
  let data = {userName:req.body.userName, streetNum:req.body.streetNum, col:req.body.col, city:req.body.city, state:req.body.state, telNum:req.body.telNum, cp:req.body.cp};
  let sql = "INSERT INTO ecClient SET ?";
  conexion.query(sql, data, function(error, results){
    if (error) {
      throw error;

    }else{
      Object.assign(data, {id_user: results.insertId })
      res.send(data);
    }
  });
});
//Modificar datos de // DEBUG
app.put('/api/cliente/:id_user', (req,res)=>{
  let id_user = req.params.id_user;
  let userName = req.body.userName;
  let streetNum = req.body.streetNum;
  let col = req.body.col;
  let city = req.body.city;
  let state = req.body.state;
  let telNum = req.body.telNum;
  let cp = req.body.cp;
  let sql = "UPDATE ecClient SET userName = ?, streetNum = ?, col = ?, city = ?, state = ?, telNum = ?, cp = ? WHERE id_user = ?";
  conexion.query(sql, [userName, streetNum, col, city, state, telNum, cp, id_user], function(error, results){
    if (error) {
      throw error;

    }else{
      res.send(results);
    }
  });
});

app.delete('/api/cliente/:id_user', (req,res)=>{
  conexion.query('DELETE FROM ecClient WHERE id_user = ?', [req.params.id_user], function(error, filas){
    if (error) {
      throw error;

    }else{
      res.send(filas);
    }
  });
});
app.listen('3000', function(){
  console.log("Server: OK");
});
