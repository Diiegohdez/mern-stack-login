import app from "./app.js";
import { connectBD } from "./db.js";
import { PORT } from "./confing.js";


connectBD();
app.listen(PORT)
console.log('serve esta activo', PORT)