import { gql } from 'react-apollo'

export default gql`
{
  mensajes {
    pkMensaje
    cuerpo
    asunto
  }
}
`