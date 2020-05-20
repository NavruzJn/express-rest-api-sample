import NoteModel from '../models/note';

class Notes {
  async create(req, res) {
    const { title, author, description, quantity } = req.body;
    const { userId } = req.params;
    const newNote = await NoteModel.create({
        title,
        author,
        description,
        quantity,
        userId
    });

    return res.status(201).send({
        message: `Your book with the title ${title} has been created successfully `,
        newNote
    })
  }
  async list(req, res) {
      const notes = await NoteModel.findAll();
      return res.status(200).send(notes);
  }
  static modify(req, res) {
    const { title, author, description, quantity } = req.body;
    return NoteModel
      .findById(req.params.noteId)
      .then((note) => {
        note.update({
          title: title || note.title,
          author: author || note.author,
          description: description || note.description
        })
        .then((updatedNote) => {
          res.status(200).send({
            message: 'Book updated successfully',
            data: {
              title: title || updatedNote.title,
              author: author || updatedNote.author,
              description: description || updatedNote.description
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static delete(req, res) {
    return NoteModel
      .findById(req.params.noteId)
      .then(note => {
        if(!note) {
          return res.status(400).send({
          message: 'Note Not Found',
          });
        }
        return note
          .destroy()
          .then(() => res.status(200).send({
            message: 'Note successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Notes