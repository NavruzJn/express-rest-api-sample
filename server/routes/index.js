import Users from '../controller/user';
import Notes from '../controller/note';

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));

    app.post('/api/users', Users.signUp); // API route for user to signup
    app.post('/api/users/:userId/books', Notes.create); // API route for user to create a book
    app.get('/api/notes', Notes.list); // API route for user to get all books in the database
    app.put('/api/notes/:bookId', Notes.modify); // API route for user to edit a book
    app.delete('/api/notes/:bookId', Notes.delete); // API route for user to delete a book
};