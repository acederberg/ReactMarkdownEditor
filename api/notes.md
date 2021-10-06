# Marius Expejo - [ NodeJS Express Test-Driven API Development ](https://www.youtube.com/watch?v=M44umyYPiuo)

We can use jest and supertest to do tests on express:

	npm install jest supertest

Marius also adds a script to hist `package.json`:

	jest --watchAll

this will make it so that jest runs a new batch of tests when you write to a project file. In typescript there are some other dependencies:

	npm install -D jest ts-jest supertest @types/jest @types/supertest

I also found these two articals about implementing typescript tests using the same frameworks

* Natneal Hussein - [Testing express js app (Typescript) using jest and supertest](https://medium.com/@natnael.awel/how-to-setup-testing-for-typescript-with-express-js-example-83d3efbb6fd4)
* Do-Yup Lim - [How to Test TypeScript with Jest](https://medium.com/nerd-for-tech/testing-typescript-with-jest-290eaee9479d)

Hussein's artical mentions that one must make a `__tests__` folder to put our tests in and that one can use 

	npmx ts-jest config:init

to create a configuration file fo `jest`. Unfortunately this config is very bare bones and does not include commented out lines. It is by default called `jest.config.js`. From here it appears to be as simple as importing our app ( obviously don't run it first ) and using the `describe` and `expect` keywords to perform tests:

	import app from "./some/where/"
	import request from "supertest"

	describe( "DESCTRIPTION: make sure we can post to route successfully.", () => }
		const res = await( app )
		.post( "/some/route/" )
		.end( { some : "json" } )

		expect( res.statusCode ).toEqual( 201 )
	} )

Lim's artical mentions the install steps and the same things about the config, but claims that the tests folder should have the name `tests`. We can use `it` to make substeps to ( kind of like plays and tasks in an ansible playbook ).
