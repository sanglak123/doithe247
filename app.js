const express = require("express");
const next = require("next");
const cors = require("cors");
const port = process.env.NEXT_PUBLIC_PORT || 3000
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();
    server.use(cors({
        origin: ["*", "https://doithe247.vercel.app/"]
    }));

    server.use(express.json());


    server.get('/a', (req, res) => {
        return app.render(req, res, '/a', req.query)
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    });
    const { sequelize } = require("./data/db/models");

    const CheckDatabase = async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    };
    CheckDatabase();

    server.listen(port, err => {
        if (err) throw err
        console.log(`Server is running on ${process.env.NEXT_PUBLIC_HOST}`);
    })
});


