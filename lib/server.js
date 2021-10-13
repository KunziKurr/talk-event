const express = require('express');
const next = require('next');
const { parse } = require('url');
const transformPhoneNumber = require('./transformPhone');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { format } = require('date-fns');
const { connectToDatabase } = require('./mongodb');
const ObjectId = require('mongodb').ObjectId;

app.prepare().then(() => {
  const app = express();
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());
  const http = require('http');
  const server = http.createServer(app);

  const { Server } = require('socket.io');
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('CONNECTION_STATUS', 'Connected to websocket');
  });

  app.all('*', async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === '/mpesaCallback') {
      try {
        // connect to the database
        let { db } = await connectToDatabase();

        const insertData = req.body.Body;
        insertData['_id'] = format(new Date(), 'yyyyMMddHHmmss');

        if (insertData.stkCallback.ResultCode === 0) {
          const CallbackMetadata = insertData.stkCallback.CallbackMetadata;
          const phoneNumber = CallbackMetadata.Item.filter(
            (element) => element.Name === 'PhoneNumber'
          );

          console.log(phoneNumber);
          // add the callback
          await db.collection('mpesa_callback').insertOne(insertData);
          // return a message
          io.emit(
            transformPhoneNumber(phoneNumber[0].Value),
            'Callback received'
          );

          return res.json({
            message: 'Success',
            success: true,
          });
        } else {
          io.emit('TRANSACTION_STATUS', { success: false });
          return res.json({
            message: 'Failed',
            success: false,
          });
        }
      } catch (error) {
        console.log(error);
        return res.json({
          message: new Error(error).message,
          success: false,
        });
      }
    } else {
      return handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
