import app from "./src/app.js";
import { connectBD } from "./src/db.js";
import { PORT } from "./src/confing.js";


connectBD();
app.listen(PORT)
console.log('serve esta activo', PORT)