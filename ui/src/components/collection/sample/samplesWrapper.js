import { Pane } from "evergreen-ui"
import defaults from "./defaults.js"

const SamplesWrapper = ({ children, margin, padding, elevation, background  }) => <Pane 
	margin = { defaults.samples_wrapper_margin || margin }
	padding = { defaults.samples_wrapper_padding || padding } 
	elevation = { defaults.samples_wrapper_elevation || elevation } 
	background = { defaults.samples_wrapper_background || background }
>{ children }</Pane>

export default SamplesWrapper

