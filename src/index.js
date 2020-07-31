const customExpress = require('./config/custom-express');
const app = customExpress();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Aplicação iniciada na porta ${PORT}`));