const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
const mongoDB = require('./db');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

mongoDB();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
app.use(cors());
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NodeJS Game Project with MongoDB',
            version: '1.0.0'
        },
        servers: [
            {
                url : 'https://gameslist-production-1ab0.up.railway.app'
            }
        ]
    },
    apis: ['./Model/GameSchema.js','./Routes/CreateGame.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/', require('./Routes/CreateGame'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
