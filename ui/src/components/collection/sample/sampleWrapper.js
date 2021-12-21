import { Pane } from 'evergreen-ui'
import defaults from './defaults.js'

export default function SampleWrapper({ _key, children, onClick, background, margin, padding, size })
{
	return <Pane
    key = { _key }
    background = { defaults.sample_background || background }
    padding = { defaults.sample_padding || padding }
    margin = { defaults.sample_margin || margin }
    width = { defaults.sample_size || size }
    height = { defaults.sample_size || size }
    style = {{ display : 'inline-block' }}
    onClick = { onClick }
  >
		{ children }
	</Pane>

}
