const customExpress = require('./configs/customExpress')
const conexao = require('./infraestrutura/conexao')
const tabelas = require('./infraestrutura/tabelas')

conexao.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('Conectado com sucesso!')

        tabelas.init(conexao)

        const app = customExpress()

        app.listen(3000, () => console.log('Server is running at port 3000'))
    }

})


