const express = require('express');
const app = express();


app.use("/api", (req, res, next) => {
    res.send("Hello from API");
});

app.listen(3000, () => console.log('Server started on port 3000'));