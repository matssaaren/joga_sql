const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()

const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to joga_mysql db')
})

// show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        });
    });
});

// Show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `
        SELECT article.*, author.name AS author_name 
        FROM article 
        JOIN author ON article.author_id = author.id 
        WHERE article.slug = ?
    `;
    con.query(query, [req.params.slug], (err, result) => {
        if (err) throw err;
        let article = result[0];
        console.log(article);
        res.render('article', { article: article });
    });
});



app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})
