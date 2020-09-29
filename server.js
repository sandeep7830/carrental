const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connectdb=async()=>{
    try {
       await mongoose.connect('mongodb+srv://sandeep123:sandeep123@cluster0.ajsii.mongodb.net/carrental?retryWrites=true&w=majority', 
       { useNewUrlParser: true ,
        useUnifiedTopology: true 
    });
   
   console.log('mongodb connected');
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

connectdb();

app.get('/',(req,res)=>{
    res.send("hii")
})

app.use( express.json({extended:false}))

app.use('/cars',require('./routes/cars'));



const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server started at ${PORT}`))




