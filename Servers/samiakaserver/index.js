const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const app = express();
app.use(express.json);
const cors = require('cors');
app.use(cors());
const token = jsonwebtoken.sign({ foo: 'bar' }, 'samia');
console.log(token)
app.use(express.urlencoded({//internal configuration 
    extended: true
}));
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json({ ...req.body, jwt: token })
})

app.listen(9002, () => {
    console.log('server running')
})