import express from 'express';
import tasks from './routes/tasks.js'
import users from './routes/users.js'
import logs from './routes/log.js'
import poolconnect from './connect.js'

const webapp = express()

webapp.use(express.json())
webapp.use('/', tasks)
webapp.use('/', users)
webapp.use('/', logs)

webapp.listen(3000, function() {
    console.log('Conexão estabelecida')
})