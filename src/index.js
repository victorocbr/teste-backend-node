const customExpress = require('./config/customExpress');
const app = customExpress();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Aplicação iniciada na porta ${PORT}`));