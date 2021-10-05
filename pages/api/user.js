import { format } from 'date-fns';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // connect to the database
      let { db } = await connectToDatabase();

      const insertData = req.body.Body;
      insertData['_id'] = format(new Date(), 'yyyyMMddHHmmss');
      // add the callback
      await db.collection('users').insertOne(insertData);
      // return a message
      return res.json({
        message: 'User added successfully',
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else if (req.method === 'GET') {
    try {
      // connect to the database
      const { db } = await connectToDatabase();
      // add the callback
      const users = await db.collection('mpesa_callback').find({}).toArray();
      // return a message
      return res.json({
        data: users,
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}
