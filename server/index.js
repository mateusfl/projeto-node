import express, { json } from "express"
import cors from "cors"

const app = express()
app.use(json())
app.use(cors())

let itemList = []

app.post("/adicionarItem", (req, res) => {
  const item = req.body.item
  if (item) {
    itemList.push(item)
    res.json({ items: itemList })
  } else {
    res.status(400).json({ message: "Erro: Nenhum item fornecido." })
  }
})

app.get("/listaItens", (req, res) => {
  res.json({ items: itemList })
})

app.delete("/limpar", (req, res)=>{
    itemList.length = 0

    res.status(200).json({message: "Items deletados com sucesso."})
})

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080.")
})
