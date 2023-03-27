// const express = require("express");
// const next = require("next");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const port = process.env.NEXT_PUBLIC_PORT || 3000
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev })
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//     const server = express();

//     server.use(bodyParser.json()) // for parsing application/json
//     server.use(bodyParser.urlencoded({ extended: true }))

//     server.use(cors({
//         origin: ["*", "https://doithe247.vercel.app/"]
//     }));

//     server.get('/a', (req, res) => {
//         return app.render(req, res, '/a', req.query)
//     });

//     server.all('*', (req, res) => {
//         return handle(req, res)
//     });
//     const { sequelize } = require("./data/db/models");

//     const CheckDatabase = async () => {
//         try {
//             await sequelize.authenticate();
//             console.log('Connection has been established successfully.');
//         } catch (error) {
//             console.error('Unable to connect to the database:', error);
//         }
//     };
//     CheckDatabase();

//     server.listen(port, err => {
//         if (err) throw err
//         console.log(`Server is running on ${process.env.NEXT_PUBLIC_HOST}`);
//     })
// });
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000 || process.env.PORT
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            if (pathname === '/a') {
                await app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query)
            } else {
                await handle(req, res, parsedUrl)
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    })
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on ${process.env.NEXT_PUBLIC_HOST}`)
        })
})

