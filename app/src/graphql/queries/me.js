import { gql } from 'react-apollo'

export default gql`
{
  me{
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
    playArk
    playWow
	}
}
`