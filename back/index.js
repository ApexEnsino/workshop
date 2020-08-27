// Importar módulos
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');

// Ativar o express
var app = express();

// Cors
app.use(cors());

// Ativar o bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Conexão MySQL
var conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'workshop'
});

// Rotas
app.get("/", function(req, res){
    var sql = "SELECT * FROM alunos";

    conexao.query(sql, function(erro, resultado){
        res.json(resultado);
    });
});

app.post("/", function(req, res){
    var nome = req.body.nome;
    var idade = req.body.idade;

    var sql = "INSERT INTO alunos (nome, idade) VALUES ('"+nome+"',"+idade+")";

    conexao.query(sql, function(erro, resultado){
        res.json({
            "codigo": resultado.insertId,
            "nome": nome,
            "idade": idade
        });
    });
});

app.delete("/:codigo", function(req, res){
    var codigo = req.params.codigo

    var sql = "DELETE FROM alunos WHERE codigo = "+codigo;

    conexao.query(sql, function(erro, resultado){
        if(resultado.affectedRows == 0){
            res.json({"mensagem":"Falha ao excluir"});
        }else{
            res.json({"mensagem":"Cliente excluído com sucesso"});
        }
    })
})


// Servidor
app.listen(4000);