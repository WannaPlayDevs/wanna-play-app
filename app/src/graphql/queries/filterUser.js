import { gql } from 'react-apollo'

export default gql`
query filterUser(
  $alias: String, 
  $playOverwatch: Boolean, 
  $playWow: Boolean, 
  $playRust: Boolean,
  $playGta: Boolean, 
  $playPubg: Boolean, 
  $playFortnite: Boolean,
  $horarioManana: Boolean,
  $horarioTarde: Boolean,
  $horarioNoche: Boolean
){
  filterUser(
    alias: $alias, 
    playOverwatch: $playOverwatch, 
    playWow: $playWow, 
    playRust: $playRust,
    playGta: $playGta, 
    playPubg: $playPubg, 
    playFortnite: $playFortnite
    horarioManana: $horarioManana,
    horarioTarde: $horarioTarde,
    horarioNoche: $horarioNoche
  ){
    pkUser
    username
    alias
    karma
    steamName
    steamName
    bnetName
    horarioManana
    playGta
    playOverwatch
    playFortnite
    playPubg
    playWow
    playRust
    horarioManana
    horarioTarde
    horarioNoche
    age
    language
    description
    country
  }
}  
`
