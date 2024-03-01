const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tooru090503',
    database: 'sample'
});

app.use(express.static('public'));
//ポストで値を取る場合

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    connection.query('select * from todo', 
    (error, results)=>{
        res.render('index.ejs',{items: results});//ここからresultsの結果をtodoというオブジェクトに入れる
    })
});
app.post('/create',(req, res)=>{
    connection.query('insert into todo(name) values(?)',
    [req.body.itemName],
    (error, results)=>{
        res.redirect('/');
    });
    
});

app.post('/delete/:id',(req, res)=>{
    connection.query('delete from todo where id = ?',
    [req.params.id],
    (error, results)=>{
        res.redirect('/');
    });
});

app.post('/edit/:id', (req, res)=>{
    connection.query('select * from todo where id = ?',
    [req.params.id],
    (error, results)=>{
        res.render('edit.ejs',{getedit: results[0]});
    });
});
app.post('/edititem/:id',(req, res)=>{
    connection.query('update todo set name = ? where id = ?',
    [req.body.itemName, req.params.id],
    (error , results)=>{
        res.redirect('/');
    });
});


app.listen(process.env.PORT||3000);