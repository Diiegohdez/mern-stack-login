import app from "./app.js";
import {connectBD} from "./db.js";


connectBD();
app.listen(4000)
console.log('serve esta activo', 4000)