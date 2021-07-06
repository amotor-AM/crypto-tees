import server from "./api/server.js"
import env from "dotenv"
const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`\n========== Server is listening on port ${port} ==========\n`)
})