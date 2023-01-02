import autores from "../models/Autor.js";

class AutorController {
    static listarAutores(req, res) {
        autores.find((err, autores) => {
            res.status(200).json(autores)
        })
    }

    static listarAutorPorId(req, res) {
        const id = req.params.id

        autores.findById(id, (err, autor) => {
            if (err) {
                res.status(400).send({message: `${err.message} - id do autor não encontrado.`})
            } else {
                res.status(200).json(autor)
            }
        })
    }

    static cadastraAutor(req, res) {
        let autor = new autores(req.body);

        autor.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar o autor.`})
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizaAutor(req, res) {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Autor atualizado com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletaAutor(req, res) {
        const id = req.params.id

        autores.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: 'Autor removido com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - id do autor não encontrado`})
            }
        })
    }
}

export default AutorController
