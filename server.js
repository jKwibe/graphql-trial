const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

let users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        shark: 'Whale Shark'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        shark: 'Hammerhead Shark'
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        shark: 'Tiger Shark'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        shark: 'Hammerhead Shark'
    }
];

const PORT = process.env.PORT || 4000

const getUser = function (args){
    let userID = args.id;
    return users.filter(user => user.id == userID)[0];
}


const getAllUsers = function (args) {
    if (args.shark) {
        let shark = args.shark;
        return users.filter(user => user.shark === shark);
    } else {
        return users;
    }
}

let schema = buildSchema(`
        type Query{
            user(id: Int!): Person
            users(shark: String): [Person]
        },
        type Person{
            id: ID
            name: String
            age: Int
            shark: String
        }
`);

let root = {
    user: getUser,  // Resolver function to return user with specific id
    users: getAllUsers
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(PORT, ()=> console.log(`Now browse to localhost:${PORT}/graphql`))