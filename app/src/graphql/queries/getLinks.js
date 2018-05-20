import { gql } from 'react-apollo'

export default gql`
{
  links{
    url
    id
    description
    postedBy {
      id
    }
    votes{
      id
      user {
        id
        username
      }
    }
  }
}
`