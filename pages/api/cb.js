import { format } from 'date-fns';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    const insertData = req.body.Body;
    insertData['_id'] = format(new Date(), 'yyyyMMddHHmmss');
    // add the callback
    await db.collection('mpesa_callback').insertOne(insertData);
    // return a message
    return res.json({
      message: 'Post added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
