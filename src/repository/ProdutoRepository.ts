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
interface Produto {
    descricao: string
}

export class ProdutoRepository {
    async findAll() {
        const cypher = `Match (p:Produto) return p`
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records.map(i => i.get('p').properties)
    }

    async findById(id: string) {
        const cypher = `Match (p:Produto) Where p.id = "${id}" return p limit 1`
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records.map(i => i.get('p').properties)
    }

    async save(produto: Produto) {
        const id = uuidv4()
        const cypher = `CREATE(p:Produto{
            id: "${id}",
            descricao:"${produto.descricao}"})`
        console.log(cypher)
        await session.run(cypher)
    }

    async update(id: string, produto: Produto) {
        const cypher = `Match(p:Produto{id: "${id}"})
            set 
                p.descricao = '${produto.descricao}'
            return p
        `
        console.log(cypher)
        const result = await session.run(cypher)
        return result.records[0].get('p').properties
    }

    async delete(id: string) {
        const cypher = `Match(p:Produto{id: "${id}"}) delete p`
        console.log(cypher)
        await session.run(cypher)
    }
}