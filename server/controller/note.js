import NoteModel from '../models/note';

class Notes {
  static async create(req, res) {
    const { title, description } = req.body;
    const { userId } = req.params;
    const newNote = await NoteModel.create({
        title,
        description,
        author: userId
    });

    return res.status(201).send({
        message: `Your book with the title ${title} has been created successfully `,
        newNote
    })
  }
  static async list(req, res) {
      const notes = await NoteModel.findAll();
      return res.status(200).send(notes);
  }
  static async modify(req, res) {
    const { title, author, description } = req.body;
    const note = await NoteModel.findById(req.params.noteId);

    if(!note) {
        return res.status(400).send({
            message: 'Note Not Found',
        });
    }

    try {
        const updatedNote = await note.update({
            title: title || note.title,
            author: author || note.author,
            description: description || note.description
        });

        return res.status(200).send({
            message: 'Book updated successfully',
            data: {
                title: title || updatedNote.title,
                author: author || updatedNote.author,
                description: description || updatedNote.description
            }
        });
    } catch (error) {
        return res.status(400).send(error);
    }
  }
  static async delete(req, res) {
      const note = await NoteModel.findById(req.params.noteId);

      if(!note) {
          return res.status(400).send({
              message: 'Note Not Found',
          });
      }

     try {
         await note.destroy();
         res.status(200).send({
             message: 'Note successfully deleted'
         })
     } catch (error) {
         res.status(400).send(error)
     }
  }
}

export default Notes