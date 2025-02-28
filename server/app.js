import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import express, { json, urlencoded } from "express"
import morgan from "morgan"
import { errorMiddleware } from "./middlewares/error.js"
import routes from "./routes/index.js"

const app = express()

if (process.env.NODE_ENV !== "production") config({ path: "./.env" })

app.use(morgan("dev"))

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(json({ limit: "50mb" }))
app.use(cookieParser())
app.use(urlencoded({ limit: "50mb", extended: true }))

app.use("/api/v1", routes)

app.use(errorMiddleware)

export default app
