const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
    { name: "Name1", genre: "comedy", id: '1' },
    { name: "Name2", genre: "comedy", id: '2' },
    { name: "Name3", genre: "comedy", id: '3' },
];

//define object type with different fields
//wrapped inside function
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

//root query - how we initialy jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString} },
            //when query is received fire this function
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

/* 
from frontend
book(id: '2'){
    name
    genre
} */

module.exports = new GraphQLSchema({
    query: RootQuery
});