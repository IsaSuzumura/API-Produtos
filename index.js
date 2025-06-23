require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const produtoRoutes = require('./routes/produtoRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/produtos', produtoRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  })
  .catch((err) => console.log(err));


