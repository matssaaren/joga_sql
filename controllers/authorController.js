const db = require('../utils/db'); 

exports.getArticlesByAuthor = (req, res) => {
    const authorId = req.params.authorId;

    const authorQuery = "SELECT name FROM author WHERE id = ?";
    const articlesQuery = "SELECT * FROM article WHERE author_id = ?";

    db.query(authorQuery, [authorId], (err, authorResult) => {
        if (err) throw err;

        const authorName = authorResult[0].name;

        db.query(articlesQuery, [authorId], (err, articlesResult) => {
            if (err) throw err;

            res.render('author', {
                author_name: authorName,
                articles: articlesResult
            });
        });
    });
};