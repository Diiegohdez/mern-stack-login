import app from "./src/app.js";
import {connectBD} from "./src/db.js";


connectBD();
app.listen(4000)
console.log('serve esta activo', 4000)