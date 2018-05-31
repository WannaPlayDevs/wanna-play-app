import { gql } from 'react-apollo'

export default gql`
  mutation createUser($username: String!, $password: String!, $alias: String!){
    createUser(username: $username, password: $password, alias:$alias) {
      user{
        username
        password
        alias
      }
    }
  }
`