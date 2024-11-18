import { VaultModel } from '../model/mongoDB/vault.js'
import  CifradoHelper  from '../Helper/cifradohelper.js'

export class VaultController{
    static async getAll (req, res) {
        const secrets = await VaultModel.getAll()
        res.json(secrets)
    }

    static async getById(req, res){
        const {id} = req.params
        const secret = await VaultModel.getByID({id})
        if(secret) {
            const passDes = CifradoHelper.decryptString(secret.passV)
            secret.passV = passDes
            return res.json(secret)
        }
        res.status(404).json({message: 'Secret not Found'})
    }

    static async create(req, res) {
        const passCif =  CifradoHelper.encryptString(req.body.passV)
        req.body.passV = passCif

        const newSecret = await VaultModel.create({input: req.body})

        res.status(201).json(newSecret)
    }

    static async updatePass(req, res){
        const passCif = CifradoHelper.encryptString(req.body.passV)
        req.body.passV = passCif

        const {id} = req.params
        
        const updatePassword = await VaultModel.updatePass({id, input: req.body})

        return res.json(updatePassword)
    }
}