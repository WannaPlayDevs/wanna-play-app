import { gql } from 'react-apollo'

export default gql`
  mutation updateUser(
    $pkUser: Int!,
    $alias: String,
    $playGta: Boolean,
    $playOverwatch: Boolean,
    $playFortnite: Boolean,
    $playPubg: Boolean,
    $playWow: Boolean,
    $playRust: Boolean,
    $horarioManana: Boolean,
    $horarioTarde: Boolean,
    $horarioNoche: Boolean,
  ){
    updateUser(
      pkUser: $pkUser,
      alias: $alias,
      playGta: $playGta,
      playOverwatch: $playOverwatch,
      playFortnite: $playFortnite,
      playPubg: $playPubg,
      playWow: $playWow,
      playRust: $playRust,
      horarioManana: $horarioManana,
      horarioTarde: $horarioTarde,
      horarioNoche: $horarioNoche,
    ) 
    {
      alias
    }
  }
`