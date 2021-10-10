import { Paragraph, Pane, Heading } from "evergreen-ui"

export default ({ _id, author, description, title }) => <Pane key = { _id } background = "gray100" padding = {16} margin = {8} width = {240} height = {240} style = {{ display : 'inline-block' }} >
	<Heading size = { 600 }>{ title ? title : "Failure :(" }</Heading>
	<Paragraph>{ description ? description : "Could not GET artical. Internal failure or failure within the backend." }</Paragraph>
</Pane>
