const connection = require('../infraestrutura/conexao')
const moment = require('moment')

class Service {
    add(attendance, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(attendance.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dateValidate = moment(data).isSameOrAfter(dataCriacao)
        const clienteValidate = attendance.cliente.length > 0

        const validates = [
            {

                nome: 'data',
                valido: dateValidate,
                mensagem: 'Data deve ser maior ou igual a data atual.'

            },
            {
                nome: 'cliente',
                valido: clienteValidate,
                mensagem: 'Cliente deve ter pelo menos uma letra de caracteres.'

            }
        ]

        const erros = validates.filter(campo => !campo.valido)
        const thereError = erros.length

        if (thereError) {
            return res.status(400).send(erros)
        } else {

            const serviceWithData = { ...attendance, dataCriacao, data }

            const sql = 'INSERT INTO Atendimentos SET ?'

            connection.query(sql, serviceWithData, (error, result) => {
                if (error)
                    return res.status(400).send({ message: 'Houve um erro! ', error })

                return res.status(201).send({ message: 'Atendimento criado com sucesso! ', attendance })
            })
        }
    }

    list(res) {
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (error, result) => {
            if (error)
                return res.status(400).send(error)

            return res.status(200).send(result)
        })
    }

    searchForId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        connection.query(sql, (error, result) => {
            if (error)
                return res.status(400).send(error)
            if (result.length < 1)
                return res.status(404).send('Id não encontrado!')
            return res.status(200).send(result)
        })
    }

    update(id, values, res) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, result) => {
            if (error)
                return res.status(400).send(error)
            return res.status(200).send(result)
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        connection.query(sql, id, (error, result) => {
            if (error)
                return res.status(400).send(error)

            return res.status(200).send({ message: `Id ${id} removido com sucesso! `, result })
        })

    }
}


module.exports = new Service