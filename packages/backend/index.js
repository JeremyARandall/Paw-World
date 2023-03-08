import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/product.js';

const app = express();


app.use(bodyParser.json({limite: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limite: "30mb", extended: true}));
app.use(cors());

app.use('/posts', productRoutes);

const CONNECTION_URL = "mongodb+srv://Dev:klhMJYV0DbUsApH3@cluster0.vaxsq2h.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);