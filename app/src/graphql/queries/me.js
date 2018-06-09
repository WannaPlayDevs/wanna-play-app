import { gql } from 'react-apollo'

export default gql`
{
  me{
	pkUser
	username
	alias
	karma
	steamName
	bnetName
	playGta
	playOverwatch
    playFortnite
    playPubg
	playWow
	playRust
	horarioManana
	horarioTarde
	horarioNoche
	}
}
`