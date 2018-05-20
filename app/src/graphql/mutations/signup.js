import { gql } from 'react-apollo'

export default gql`
  mutation createUser($username: String!, $password: String!, $email: String!){
    createUser(username: $username, password: $password, email:$email) {
      user{
        username
        password
        email
      }
    }
  }
`