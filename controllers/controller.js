const attendanceModel = require('../models/models')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        attendanceModel.list(res)
        
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = req.params.id
        
        attendanceModel.searchForId(id, res)

    })

    app.post('/atendimentos', (req, res) => {
        const body = req.body

        attendanceModel.add(body, res)

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = req.params.id
        const values = req.body

        attendanceModel.update(id, values, res)
    })
 
    app.delete('/atendimentos/:id', (req, res) => {
        const id = req.params.id

        attendanceModel.delete(id, res)
    })


}