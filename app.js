const { MongoClient, ObjectId } = require('mongodb'); 
// or as an es module: 
// import { MongoClient } from 'mongodb' 
 
// Connection URL 
const url = 'mongodb://127.0.0.1:27017'; 
const client = new MongoClient(url); 
 
// Database Name 
const dbName = 'wpu'; 
 
async function main() { 
  // Use connect method to connect to the server 
  await client.connect(); 
  console.log('Connected successfully to server'); 
  const db = client.db(dbName); 
  const collection = db.collection('mahasiswa'); 
 
//   //menambahkan data lebih dari 1 
 
 
//   const insertResult = await collection.insertMany([ 
//     {  
//       nama: 'asep', 
//       email: 'asepkun@gmail.com' 
//     },  
//     { 
//        nama: 'usep', 
//        email: 'usepaja1@gmail.com' 
//     } 
//   ]); 
//   console.log('Inserted documents =>', insertResult); 
 
//   // menampilkan semua data 
 
 
//   const findResult = await collection.find({}).toArray(); 
//   console.log('Found documents =>', findResult); 
//   // the following code examples can be pasted here... 
 
 
//   //mengubah data 
 
 
//   const updateResult = await collection.updateOne( 
//     {  
//       _id: new ObjectId('64d0adcbb56f53bbc75b8f99') 
//     },  
//     { $set:  
//       {  
//         nama: 'Randu hazel harvani', 
//       },  
//     } 
//     ); 
//   console.log('Updated documents =>', updateResult); 
 
 
//   //mengubah data lebih dari satu 
 
//   const updateResult = await collection.updateMany( 
//     {  
//       nama: 'asep', 
//     },  
//     { $set:  
//       {  
//         nama: 'asepun', 
//       },  
//     } 
//     ); 
//   console.log('Updated documents =>', updateResult); 
 
//   //menghapus 1 data 
 
//   const deleteResult = await collection.deleteOne( 
//     {  
//       _id: new ObjectId('64d1a8be6178e6ef98a135a2'), 
//     } 
//     ); 
//   console.log('Deleted documents =>', deleteResult); 
 
//   //menghapus lebih dari 2 data 
 
 
//   const deleteResult = await collection.deleteMany( 
//     {  
//       nama: 'Udin', 
//     }, 
//     ); 
//   console.log('Deleted documents =>', deleteResult); 
 
  return 'done.'; 
 
} 
 
main() 
  .then(console.log) 
  .catch(console.error) 
  .finally(() => client.close());
