import { MongoClient } from 'mongodb';

export default (callback) => {
    MongoClient.connect('mongodb://localhost:27017/homepage', callback);
}
