const { gql } = require('apollo-server')
module.exports = gql`
 type Query {
  list(id: ID): List
  lists: [List]
}

type ToDo {
  message: String
  number: Int
  _id: ID 
}

type List {
  _id: ID
  name: String
  todos: [ToDo]
}

type Mutation {
  updateListToDos(id: ID, todos: [ToDoInput]): List
  addList(list: ListInput): List
  deleteList(id: ID!): Boolean
}


input ListInput {
  name: String
  todos: [ToDoInput]
}

input ToDoInput {
  message: String
}
`