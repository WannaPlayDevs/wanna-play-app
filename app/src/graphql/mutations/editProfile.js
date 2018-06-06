import { gql } from 'react-apollo'

export default gql`
  mutation updateUser($pkUser: Int!, $alias: String){
    updateUser(pkUser: $pkUser, alias:$alias) {
      alias
    }
  }
`