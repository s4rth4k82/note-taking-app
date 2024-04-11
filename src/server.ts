import mongoose, { ConnectOptions } from 'mongoose';
import noteRoutes from './routes/note.routes';
const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', noteRoutes);

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://sarthakpravin08:notesapp@cluster0.4pb4f0j.mongodb.net/');
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

startServer();
