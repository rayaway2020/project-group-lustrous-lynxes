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
        password: '11111111',
        likedPlaylist: ['000000000000000000000001'],
        ownedPlaylist: ['000000000000000000000002'],
        likedSongs: ['000000000000000000000001'],
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

const playlists = [
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000001'), 
        title: 'playlist 1',
        content: [
            '000000000000000000000001',
            '000000000000000000000002',
        ]
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000002'), 
        title: 'playlist 2',
        content: [
            '000000000000000000000003',
        ]
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000003'), 
        title: 'playlist 3',
    }
];

const songs = [
    { 
        _id: '000000000000000000000001', 
        title: 'song 1',
        comments: [
            '000000000000000000000001',
            '000000000000000000000002',
        ]
    },
    { 
        _id: '000000000000000000000002', 
        title: 'song 2',
        comments: [
            '000000000000000000000003',
        ]
    },
    { 
        _id: '000000000000000000000003',
        title: 'song 3',
    }
];

const comments = [
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000001'), 
        title: 'comment 1',
        likedUsers: [
            '000000000000000000000001',
        ]
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000002'), 
        title: 'comment 2',
    },
    { 
        _id: new mongoose.Types.ObjectId('000000000000000000000003'),
        title: 'comment 3',
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
    
    const playlistsCollection = await mongoose.connection.db.createCollection('playlists');
    await playlistsCollection.insertMany(playlists);
    
    const songsCollection = await mongoose.connection.db.createCollection('songs');
    await songsCollection.insertMany(songs);
    
    const commentsCollection = await mongoose.connection.db.createCollection('comments');
    await commentsCollection.insertMany(comments);

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

it('gets all playlists', async () => {

    const playlistsFromDb = await Playlist.find();
    expect(playlistsFromDb.length).toBe(3);

})

it('gets a single playlist', async () => {
    const playlistFromDb = await Playlist.findById('000000000000000000000001');

    expect(playlistFromDb._id).toEqual(new mongoose.Types.ObjectId('000000000000000000000001'));
});

it('gets all songs', async () => {

    const songsFromDb = await Song.find();
    expect(songsFromDb.length).toBe(3);

})

it('gets a single song', async () => {
    const songFromDb = await Playlist.findById('000000000000000000000001');

    expect(songFromDb._id).toEqual(new mongoose.Types.ObjectId('000000000000000000000001'));
});

it('gets all comments', async () => {

    const commentsFromDb = await Comment.find();
    expect(commentsFromDb.length).toBe(3);

})

it('gets a single comment', async () => {
    const commentFromDb = await Comment.findById('000000000000000000000001');

    expect(commentFromDb._id).toEqual(new mongoose.Types.ObjectId('000000000000000000000001'));
});

it('gets songs in a playlist', async () => {
    const playlistFromDb = await Playlist.findById('000000000000000000000001');

    expect(playlistFromDb.content.length).toBe(2);
    expect(playlistFromDb.content[0]).toEqual('000000000000000000000001');
    expect(playlistFromDb.content[1]).toEqual('000000000000000000000002');
});

it('gets comments in a song', async () => {
    const songFromDb = await Song.findById('000000000000000000000001');

    expect(songFromDb.comments.length).toBe(2);
});

it('gets users in a comment', async () => {
    const commentFromDb = await Comment.findById('000000000000000000000001');

    expect(commentFromDb.likedUsers.length).toBe(1);
    expect(commentFromDb.likedUsers[0]).toEqual('000000000000000000000001');
});

it('gets liked playlist in a user', async () => {
    const userFromDb = await User.findById('000000000000000000000001');

    expect(userFromDb.likedPlaylist.length).toBe(1);
    expect(userFromDb.likedPlaylist[0]).toEqual('000000000000000000000001');
});

it('gets owned playlist in a user', async () => {
    const userFromDb = await User.findById('000000000000000000000001');

    expect(userFromDb.ownedPlaylist.length).toBe(1);
    expect(userFromDb.ownedPlaylist[0]).toEqual('000000000000000000000002');
});

it('gets liked songs in a user', async () => {
    const userFromDb = await User.findById('000000000000000000000001');

    expect(userFromDb.likedSongs.length).toBe(1);
    expect(userFromDb.likedSongs[0]).toEqual('000000000000000000000001');
});