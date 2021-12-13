# Markdown Editor

A small project I wrote for some practice with `docker`, `docker-compose`, `react`, and `flask-sqlalchemy`. I also used `bootstrap` to make `css` and wrote `css` for the rendered markdowns, excluding syntax highlighting, which is done using `prism` with `react-syntax-highlighter`, which was used a plugin in `react-markdown`. The front end uses a minimal RESTful CRUD API built from `NginX` and `FlaskSQLAlchemy`. The purpose being that Nginx will serve our raw markdown files while the `FlaskSQLAlchemy` app allows us to `POST` new markdowns, edit existing markdowns using `PUT` requests, view the existing markdowns with `GET` requests, and `DELETE` markdowns by specifying the id. *(This app only defines a single endpoint)*. The API is RESTful in the sense that it is a stateless, cachable, layered system ( especially if a reverse proxy were put in the way ) that is build to serve a client, the markdown renderer and editor.


## Running

Install [Docker]( https://www.docker.com/ ). Modern versions of docker will include `docker-compose` (as `docker compose`), while others will require separate installation. Pull this repository using `git pull <link for repo>` and `cd` into it. Then

	docker compose up

to start the backend and

	cd ux && docker compose up

to start the frontend. Hypothetically this could be set up without docker using another means of containerization, e.g. `containerd`. However not using containers will likely require you to run `NginX` locally or on a vm, niether of which is convenient as running a container.


## UX

There were some interesting problems here due to the way that `react-markdown` works. In particular, `react-markdown`s `RenderMarkdown` component must be rendered into the `ReactDOM` and not directly, since there is useful since it makes a 'virtual dom' to render the elements into, allowing real time rendering without calling `dangerouslySetInnerHTML` ( as the name implies, is dangerous since it allows for nasty things like code injection ) or completely overriding. This is especially import since rerendering the markdown frequently would decrease performance an maximize the ammount of work on the client side, which is done with great frequency the markdown editor. Read more about `react-markdown` [here](https://www.npmjs.com/package/react-markdown).

These problems include making routing change the DOM while not returning any noticable `HTML`. This problem was circumvented by having the `react-router-dom` `Route` components `render` prop calls a method that renders the markdown into some part of the DOM. 

<a name = api></a>
## API

This API uses sqlite since the scale of the system and the amount of metadata included is insignificant, e.g. things like a description, title, author name, links for images, etc. could be included. In this case the metadata consists exclusively of a file name and its location. If more metadata were included, due to the lengthly nature of descriptions and edit histories, it would be better to use a non-relation database like mongodb. This would offer the additional convenience of allowing us to keep the text and metadata in the same location and unify the data. Since markdowns are typically fairly small this is fairly attainable. 

I used `NginX` to serve the raw markdowns ( by requesting their name by URI ) in addition to talking to the `uwsgi` http-socket on the `flask` container.


## POSTER

A `Python3` script using the `requests` library to post dummy data to the [markdowns api]( #api ). This is useful for the development of the UX, since it only has full functionality when there is data.


## Gitlab CI/CD and Ansible

In the cicd branch you will find a variety of tools for running the website locally, bringing up a gitlab-runner to run gitlab tasks, `PowerShell` scripts to automate various tasks in this environment, and for the time being some shell scripts. Soon I will link to an artical here.
