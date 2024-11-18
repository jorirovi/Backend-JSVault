import { VaultController } from '../controller/vault.js'
import { Router } from 'express'

export const vaultRouter = Router()

vaultRouter.get('/', VaultController.getAll)
vaultRouter.post('/', VaultController.create)

vaultRouter.get('/:id', VaultController.getById)
vaultRouter.patch('/:id', VaultController.updatePass)
