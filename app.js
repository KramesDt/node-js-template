import express  from "express"
import  dotenv  from "dotenv"
import cors from "cors"
import feedbackRouter from './routes/feedback.router.js'
import userRouter from "./routes/userRoutes.js"
dotenv.config();

const app = express()
app.use(cors());

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req, res) =>{
    res.json({message: "welcome"})
})

// Routes
app.use('/api/auth', userRouter);
app.use('/api/feedbacks/', feedbackRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


export default app;