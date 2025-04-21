require('dotenv').config(); 

const express=require('express')


const mongoose=require('mongoose')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter=require ('./routes/auth-route/auth-route');
const staffRouter=require('./routes/staff-route/staff-route')
const studentRouter=require('./routes/student-route/student-route')
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongodb connected"))
.catch((error)=>console.log(error));

const app=express();
const PORT=process.env.PORT;

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            'Expires',
            'Pragma'
        ],
        credentials:true // Enables sending cookies or authentication headers along with cross-origin requests.
    })
);
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/staff/qr',staffRouter);
app.use("/api/student/qr",studentRouter);
app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`))
