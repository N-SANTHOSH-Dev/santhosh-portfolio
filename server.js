const express = require('express');
const path = require('path');
const app = express();

// serves everything inside the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Running at http://localhost:3000'));