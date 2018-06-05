import { gql } from 'react-apollo'

export default gql`
query misMensajes($fkDestinatario: String!) {
  misMensajes(fkDestinatario: $fkDestinatario) {
    cuerpo
    asunto
    fkRemitente{
      username
      alias
    }
  }
}
`