import app from "./src/app.js";


const PORT = app.get("port");
console.log(PORT);

app.listen(PORT, function() {
    console.log('Sever is running on port ' + PORT)
});