import { Spinner, Pane } from 'evergreen-ui'

export default function CenteredSpinner(){
	return <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
		<Spinner />
	</Pane>
}
