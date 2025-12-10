import express from "express"
import cors from "cors"
import env from "dotenv"
import connectDB from "./connectDB/connect.js"
env.config()

import userRoutes from "./routes/user.routes.js"
import uploadImages from "./routes/uploud.route.js"
import productRoutes from "./routes/product.routes.js"

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/uploud',uploadImages)
app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.patch('/api/product',productRoutes)

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    connectDB();
})