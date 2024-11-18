import  express, { json }  from 'express'
import { vaultRouter } from './router/vault.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/vault', vaultRouter)


//conexion del servidor
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
