import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Vaelix Admin API is running 🚀")
})

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`)
})