# Markdown Editor

A simple blog with a ui editor made using microservices. I decided to go about this in this way for the sake of simplicity when adding further services. It consists of three services: 

1. A front end to display and edit markdowns using ReactJS with `evergreen-ui` and `react-bootstrap` for styling, the `fetch` api for requests to the back-end, `react-markdown` and `react-syntax highlighter` for rendering the markdown, and some custom css for styling the rendered markdown as well as `auth0-react` for authentication.
2. A RESTful web API using `typescript` with `express`, `mongoose` and `mongodb` to record markdowns and some metadata about the markdowns. Uses auth0 tokens to protect CRUD endpoints.
3. A reverse proxy to glue it all together.

Both the front end and back end use `Auth0` for authentication. Testing is done with `jest` and `supertest`. Included in the main branch are the development and production docker containers as well as the devlopment configuration files. There is also a branch `cicd` which is responsible to deploying the main branch, working with `ansible` and `gitlab`. There will also be `vagrantfile`s for the gitlab runner and the deployment server in addition to the `docker`ized `ansible`. 

# Running

To run in development mode, run

	docker-compose --file docker-compose.prod.yaml up --build 
