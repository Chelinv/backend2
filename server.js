const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fabrica", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
