import { gql } from 'react-apollo'

export default gql`
query misMensajes($fkDestinatario: String!) {
  misMensajes(fkDestinatario: $fkDestinatario) {
    cuerpo
    asunto
    fecha
    fkRemitente{
      pkUser
      username
      alias
    }
    fkDestinatario{
      pkUser
      username
    }
  }
}
`