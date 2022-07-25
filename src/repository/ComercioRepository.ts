import { config } from "dotenv";
import * as neo4j from "neo4j-driver";

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

interface Compra {
    idCliente: string,
    idProduto: string
}

interface Venda {
    idCliente: string,
    idProduto: string
}


export class ComercioRepository {
    async savePurchase(compra: Compra) {
        const cypher = `MATCH (c:Cliente),(p:Produto)
            WHERE c.id = '${compra.idCliente}'
            AND p.id = '${compra.idProduto}'
            CREATE (c)<-[compr:COMPROU{
                data: "${new Date()}"
            }]-(p)
            RETURN c,p`
        console.log(cypher)
        await session.run(cypher)
    }

    async saveSale(venda: Venda) {
        const cypher = `MATCH (c:Cliente),(p:Produto)
            WHERE c.id = '${venda.idCliente}'
            AND p.id = '${venda.idProduto}'
            CREATE (c)-[compr:VENDEU{
                data: ${new Date()}
            }]->(p)
            RETURN c,p`
        console.log(cypher)
        await session.run(cypher)
    }
}