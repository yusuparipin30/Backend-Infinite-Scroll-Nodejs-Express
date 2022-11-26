//1.import express
import express from "express";
//2. import cors
import cors from "cors";
//6.import UserRoutes setelah di baut pada file UserRoutes.js
import UserRoutes from "./routes/UserRoutes.js"

//3.membuat app function
const app = express();
//5.medlwr
app.use(cors());
app.use(express.json());
//7.
app.use(UserRoutes);

//4.memberikan pesan bahwa aplikasi berjalan dengan baik
app.listen('5000', () => console.log('Server up and running...'));
