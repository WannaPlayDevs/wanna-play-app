import { gql } from 'react-apollo'

export default gql`
{
  me {
    id
    firstName
    lastName
    email
  }
}
`