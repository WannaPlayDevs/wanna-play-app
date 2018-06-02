import { gql } from 'react-apollo'

export default gql`
{
  users {
    username
    alias
  }
}
`