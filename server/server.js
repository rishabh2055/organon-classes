import 'core-js/stable';
import 'regenerator-runtime/runtime';
import http from 'http';
import express from 'express';
// body-parser helps to parse the request and create the req.body object
import bodyParser from 'body-parser';
// HTTP request logger middleware for node.js
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import models from './models';
import routes from './routes';

const serveIndex = require('serve-index');


const app = express();

models.sequelize.sync();
app.use(cors());

app.use(morgan('combined'));
app.use(cookieParser());

//set port, listen  for requests
const PORT = process.env.PORT || 4000;

//parse requests of content-type - application/json
app.use(express.json());
//parse requests of content-type - application/x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: config.secret
// }))

// app.use(flash());

// app.use(
//   express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(helmet());
// app.disable("x-powered-by");

app.use('/api', routes);

app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

app.get('*.*', express.static(path.join(process.cwd(), 'client', 'dist', 'organon-classes')));

// // view engine setup
app.get('*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'client', 'dist', 'organon-classes', 'index.html'));
});
http.createServer(app).listen(PORT, function () {
  console.log(`Server is running on port:: ${PORT}`);
});

export default app;
