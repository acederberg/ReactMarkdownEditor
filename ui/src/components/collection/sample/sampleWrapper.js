import { Pane } from 'evergreen-ui'


export default function SampleWrapper({ _key, children, size, onClick })
{

	return <Pane
    key = { _key }
    background = "gray100"
    padding = {16}
    margin = {8}
    width = { 240 || size }
    height = { 240 || size }
    style = {{ display : 'inline-block' }}
    onClick = { onClick }
  >
		{ children }
	</Pane>

}
