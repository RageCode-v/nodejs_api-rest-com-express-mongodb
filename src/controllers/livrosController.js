import livros from "../models/Livro.js";
import EditoraController from "./editorasController.js";

class LivroController {
    static listarLivros(req, res) {
        livros.find()
            .populate('autor')
            .populate('editora')
            .exec((err, livros) => {
                res.status(200).json(livros)
            })
    }

    static listarLivroPorId(req, res) {
        const id = req.params.id

        livros.findById(id)
            .populate('autor', 'nome')
            .populate('editora')
            .exec((err, livro) => {
                if (err) {
                    res.status(400).send({message: `${err.message} - id do livro não encontrado.`})
                } else {
                    res.status(200).json(livro)
                }
            })
    }

    static cadastraLivro(req, res) {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar o livro.`})
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizaLivro(req, res) {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletaLivro(req, res) {
        const id = req.params.id

        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: 'Livro removido com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - id do livro não encontrado`})
            }
        })
    }

    static async listarLivroPorEditora(req, res) {
        const nomeEditora = new RegExp(req.query.editora, "i")

        const editora = await EditoraController.buscaPorNome(nomeEditora)

        if (!editora) {
            res.status(404).json({message: 'Editora não encontrada'})
        } else {
            livros.find({'editora': editora._id})
                .populate('autor')
                .populate('editora')
                .exec((err, livro) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).send(livro)
                    }
                })
        }
    }
}

export default LivroController
