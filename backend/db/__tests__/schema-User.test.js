import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, Song, Comment, Playlist } from '../schema';

let mongod;

// Test data
const users = [
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000001'), 
        username: 'user1', 
        email: 'user1@gmail.com', 
        password: '11111111' 
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000002'), 
        username: 'user2', 
        email: 'user2@gmail.com', 
        password: '22222222' 
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000003'), 
        username: 'user3', 
        email: 'user3@gmail.com', 
        password: '33333333' 
    }
];

// Before all, init MongoMemoryServer.
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

// Before each, make sure the database has the test data.
beforeEach(async () => {

    // Clear all existing data.
    await mongoose.connection.db.dropDatabase();

    // Insert dummy users
    const usersCollection = await mongoose.connection.db.createCollection('users');
    await usersCollection.insertMany(users);

});

// After all, terminate in-memory DB.
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
})

it('gets all users', async () => {

    const usersFromDb = await User.find();
    expect(usersFromDb.length).toBe(3);

    for (let i = 0; i < usersFromDb.length; i++) {
        expect(usersFromDb[i]._id).toEqual(users[i]._id);
        expect(usersFromDb[i].username).toEqual(users[i].username);
        expect(usersFromDb[i].email).toEqual(users[i].email);
        expect(usersFromDb[i].password).toEqual(users[i].password);
    }

});

it('gets a single user by id', async () => {
    const userFromDb = await User.findById('000000000000000000000002');
    expect(userFromDb._id).toEqual(new mongoose.Types.ObjectId('000000000000000000000002'));
    expect(userFromDb.username).toEqual('user2');
    expect(userFromDb.email).toEqual('user2@gmail.com');
    expect(userFromDb.password).toEqual('22222222');
});

it('fails to get a user with invalid id', async () => {
    const userFromDb = await User.findById('000000000000000000000000');
    expect(userFromDb).toBeNull();
});

it('gets a single user by username', async () => {
    const userFromDb = await User.findOne({ username: 'user1' });
    expect(userFromDb._id).toEqual(new mongoose.Types.ObjectId('000000000000000000000001'));
    expect(userFromDb.username).toEqual('user1');
    expect(userFromDb.email).toEqual('user1@gmail.com');
    expect(userFromDb.password).toEqual('11111111');
});