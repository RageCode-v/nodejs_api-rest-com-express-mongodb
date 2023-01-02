import editoras from "../models/Editora.js";

class EditoraController {
    static listarEditoras(req, res) {
        editoras.find((err, editoras) => {
            res.status(200).json(editoras)
        })
    }

    static listarEditoraPorId(req, res) {
        const id = req.params.id

        editoras.findById(id, (err, editora) => {
            if (err) {
                res.status(400).send({message: `${err.message} - id da editora não encontrado.`})
            } else {
                res.status(200).json(editora)
            }
        })
    }

    static cadastraEditora(req, res) {
        let editora = new editoras(req.body);

        editora.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar a editora.`})
            } else {
                res.status(201).send(editora.toJSON())
            }
        })
    }

    static atualizaEditora(req, res) {
        const id = req.params.id;

        editoras.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: 'Editora atualizado com sucesso.'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }

    static deletaEditora(req, res) {
        const id = req.params.id

        editoras.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: 'Editora removido com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - id da editora não encontrado`})
            }
        })
    }

    static async buscaPorNome(nome) {
        return await editoras.findOne({'nome': nome})
    }
}

export default EditoraController
