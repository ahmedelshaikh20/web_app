const express = require('express');
const app = express();

const Instructor = require('./routes/Instructor');
const Coordinator = require('./routes/Coordinator');
var cors = require('cors');

const profile = require('./routes/profile');
const HR = require('./routes/HR');
const posts = require('./routes/posts');
const HR2 = require('./routes/HR2');
const hod = require('./routes/hod');
const bodyParser = require('body-parser');
const attendance = require('./routes/staff.js');

const scheduleViewer = require('./routes/view_schedule');
const submitRequest = require('./routes/submit_requests');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const replacementApproval = require('./routes/replacement_approval');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  //To allow requests from client
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('connected to db');
});
app.use(cookieParser());
app.use(express.json());

app.use('/api/user/instructor', cors(corsOptions), Instructor);
app.use('/api/user/coordinator', cors(corsOptions), Coordinator);

app.use('/api/user', cors(corsOptions), profile);
app.use('/api/user/hr', cors(corsOptions), HR);
app.use('/api/test', cors(corsOptions), posts);
app.use('/api/v1/staff', cors(corsOptions), attendance);
app.use('/api/v1/HR2/', cors(corsOptions), HR2);
app.use('/api/user/viewScedule', cors(corsOptions), scheduleViewer);
app.use('/api/user/request', cors(corsOptions), submitRequest);
app.use('/api/hod/', cors(corsOptions), hod);
app.use('/api/user/replacement', cors(corsOptions), replacementApproval);

app.listen(3000, () => console.log('server running....'));
