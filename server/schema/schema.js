const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

//dummy data
var books = [
    { name: "Name1", genre: "comedy", id: '1' },
    { name: "Name2", genre: "comedy", id: '2' },
    { name: "Name3", genre: "comedy", id: '3' },
];

var authors = [
    { name: "author1", age: 23, id: '1' },
    { name: "author2", age: 54, id: '2' },
    { name: "author3", age: 12, id: '3' },
];

//define object type with different fields
//wrapped inside function
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

//root query - how we initialy jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID} },
            //when query is received fire this function
            resolve(parent, args){
                console.log(typeof(args.id))
                //code to get data from db/other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID} },
            //when query is received fire this function
            resolve(parent, args){
                //code to get data from db/other source
                return _.find(authors, { id: args.id });
            }
        },
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