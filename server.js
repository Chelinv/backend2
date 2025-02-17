const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
const cors = require("cors");

app.use(cors({
  origin: "https://frontend2-67s5.vercel.app/", // O permitir solo tu frontend: "https://tudominio.vercel.app"
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// Conexión a MongoDB
const MONGO_URI = 'mongodb+srv://chelinv2004:MD1217cv2019@cluster0.xfa8v.mongodb.net/fabrica'; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Esquema y modelo
const ModeloSchema = new mongoose.Schema({
  tipo: String,
  talla: String,
  costoTela: Number,
  costoManoObra: Number,
  ganancia: Number,
});

const Modelo = mongoose.model("Modelo", ModeloSchema);

// Rutas
app.post("/api/modelos", async (req, res) => {
  console.log("Recibido:", req.body); // Ver si el backend recibe datos
  try {
    const nuevoModelo = new Modelo(req.body);
    await nuevoModelo.save();
    res.status(201).json(nuevoModelo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/modelos", async (req, res) => {
  try {
    const modelos = await Modelo.find();
    res.json(modelos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
