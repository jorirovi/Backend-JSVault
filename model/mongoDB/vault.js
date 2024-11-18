import { ObjectId, MongoClient, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://jorirovi:5RR3j9TtBxqg@mongodb101.0evp19y.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB101'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
})

async function connect () {
    try {
      await client.connect()
      const database = client.db('gymDB')
      return database.collection('vault')
    } catch (error) {
      console.error('Error connecting to the database')
      console.error(error)
      await client.close()
    }
}

export class VaultModel {
    static async getAll (){
        const db = await connect()
        return db.find({}).toArray()
    }

    static async getByID({id}){
      const db = await connect()
      const objectId = new ObjectId(id)
      return db.findOne({_id: objectId})
    }

    static async create ({input}) {
      const db = await connect()
      const {insertId} = await db.insertOne(input)

      return {
        _id: insertId,
        ...input
      }
    }

    static async updatePass ({id, input}){
      const db = await connect()
      const objectId = new ObjectId(id)

      const {ok, value} = await db.findOneAndUpdate({ _id: objectId}, {$set: input}, {returnDocument: true})

      if(!ok) return false

      return value
    }
}