const express = require('express');
const app = express();
const PORT = 5000;
const mysql = require('mysql2');
const session = require('express-session');
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'pug');
app.locals.pretty = true;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nwind'
})

app.get('/category',(req,res)=>{
    con.connect((err)=>{
        con.query('SELECT * FROM categories',(err,result,field)=>{
            res.render('ui_category',{
                categories: result,
            })
        })
    })
})

app.get('/category/:id',(req,res)=>{
    const {id} = req.params;
    con.connect((err)=>{
        con.query(`SELECT * FROM products WHERE CategoryID = ${id}`,(err,result,field)=>{
            res.render('ui_product_all',{
                produk: result,
            })
        })
    })
})

app.get('/detail-produk/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
    con.connect((err)=>{
        con.query(`SELECT * FROM products WHERE ProductID = ${id}`,(err,result,field)=>{
            console.log(result);
            res.render('ui_detail_product',{
                produk: result[0],
            })
        })
    })
})


app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})