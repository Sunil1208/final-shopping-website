require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//My routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/stripePayment')
const app = express();

const port =process.env.PORT || 5050;


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED");
})

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',stripeRoutes);

//Server static asses if in production
if(process.env.NODE_ENV == 'production') {
    //Set the static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}


app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})