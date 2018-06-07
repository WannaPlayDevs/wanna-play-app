import { gql } from 'react-apollo'

export default gql`
  mutation createMensaje($fkDestinatario: Int!, $fkRemitente: Int!, $cuerpo: String!  $asunto: String!){
    createMensaje(fkDestinatario: $fkDestinatario, fkRemitente: $fkRemitente, cuerpo: $cuerpo, asunto: $asunto) {
      pkMensaje
    }
  }
`