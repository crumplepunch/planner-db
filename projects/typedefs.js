const { gql } = require('apollo-server')
module.exports = gql`
type Query {
  projects(sortField: String, direction: Int):[Project]
  project(id: ID, name: String): Project
}

type Completion {
  message: String
  date: String
}

type Vertical {
  lead: String
  stack: [String]
  completions: [Completion]
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
  design: Vertical
  development: Vertical
  plans: Plans
}
`