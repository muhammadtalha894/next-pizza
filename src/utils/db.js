import mongoose from 'mongoose';

const connection = {};
const mongoURI = process.env.DB_URI;

const connect = async () => {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous Connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
  });

  console.log('new Connection');
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not Connected');
    }
  }
};

const db = { connect, disconnect };

export default db;
