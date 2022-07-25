import { config } from "dotenv";
import * as neo4j from "neo4j-driver";
import { v4 as uuidv4 } from 'uuid';

config()

const {
    NEO4J_URL,
    NEO4J_USER,
    NEO4J_PASSWORD,
    NEO4J_DATABASE,
} = process.env

console.log(NEO4J_URL,
    NEO4J_USER,
    NEO4J_PASSWORD,
    NEO4J_DATABASE
)

const driver = neo4j.driver(NEO4J_URL as string, neo4j.auth.basic(NEO4J_USER as string, NEO4J_PASSWORD as string))
const session = driver.session({ database: NEO4J_DATABASE as string })
interface Cliente {
    nome: string,
    data_nascimento: Date,

}

export class ClientRepository {
    async findAll() {
        const cypher = `Match (c:Cliente) return c`
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records.map(i => i.get('c').properties)
    }

    async findById(id: string) {
        const cypher = `Match (c:Cliente) Where c.id = "${id}" return c limit 1`
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records.map(i => i.get('c').properties)
    }

    async save(cliente: Cliente) {
        const id = uuidv4()
        const cypher = `CREATE(c:Cliente{
            id: "${id}",
            nome:"${cliente.nome}",
            data_nascimento:"${cliente.data_nascimento}"})`
        console.log(cypher)
        await session.run(cypher)
    }

    async update(id: string, cliente: Cliente) {
        const cypher = `Match(c:Cliente{id: "${id}"})
            set 
                c.nome = '${cliente.nome}',
                c.data_nacimento = '${cliente.data_nascimento}'
            return c
        `
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records[0].get('c').properties
    }

    async delete(id: string) {
        const cypher = `Match(c:Cliente{id: "${id}"}) delete c`
        console.log(cypher)
        await session.run(cypher)
    }
}