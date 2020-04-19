const { gql } = require('apollo-server')
module.exports = gql`
type Query {
  projects(sortField: String, direction: Int):[Project]
  project(id: ID, name: String): Project
  logs: [Log]
}

type Mutation {
  addProject(name: String, description: String): Project
}

type Log {
  markdown: String
  project: String 
  name: String
  date: String
  _id: String
}

type Cost {
  time: Int
  money: Int
}

type Plan {
  cost: Cost
  tasks: [String]
}

type Plans {
  infrastructure: Plan
  design: Plan
  release:  Plan
  research: Plan
  build: Plan
}

type Project{
  _id: String
  name: String
  description: String
  summary: String
  plans: Plans
  logs: [Log]
}
`