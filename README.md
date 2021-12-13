# The Portfolio Project


The following are some notes about the making of this portfolio. For more on the applications, see the [github repository]( https://github.com/acederberg/ReactMarkdownEditor/tree/cicd ). This document is not a read me.


## Intended Functionality


The objectives of the end product are:

1. Edit markdowns in a UI, use an API to store these markdowns and their metadata.
2. Add authentication to sensitive API endpoints and particular routes in the user interface.
3. Implement infrastructure as code such that the website may be torn down and relocated, and additionally simulated on a local machine.
4. Scripts to automate various tasks in the local 'lab' environment and the actual production environment.


## Why?


The initial objective of this project was to familiarize myself further with some devops tools by making a blog out of a markdown editor made in `react` and the ascociated express `typescript` api which I had made. Further, I need a portfolio to make applying to jobs make any sense and absolutaley refuse to use wordpress or some other prepackaged solution *( though if you need one, I am working on a similar boilerplate which will be revealed soon )*. To list a few such technologies:

- `ansible` -- For automation. A instances for which it was used
	*	Bring up new webservers with minimal configuration and running jobs on webservers. *(e.g. install `docker` and `docker-compose`, the `docker` `python` sdk, run the docker compose, etc ).* 
	*	Bring up new gitlab-runners with minimal configuration ( registration of the runner must be done manually, but that is it ). Push images build by the continuous integration pipeline.
	*	Back up and distribute docker volumes.
	*	Various configuration templates ( e.g. docker-compose ), security issues ( passwords and secrets ).
- `gitlab` -- For continuous integration.
	* Run tests on code. Build production images for deployment. 
	* Will eventually trigger ansible jobs depending on success or fialure.
- `vagrant` -- For building local versions of the simulation.
	* Make a local ansible controller with basically no manual cofiguration.
	* Make local web servers and gitlab-runners to simulate the production environment locally and run gitlab CI jobs locally.
- `docker` and `docker compose` -- Containerization an scaling of apps.


In this case, I had to learn `ansible` and `vagrant`, both of which were simple with excellent documentation. I also learned `gitlab`, which was a more painful experience but nonetheless with great documentation.



## Why such a lame domain name?


Well, I now recall it was ten dollars for the first year on porkbun. I will likely change it, though I must brainstorm a better name first.



## What are the `PowerShell` Scripts For?


I wrote some powershell scripts to automate redundant tasks, such as:


- Generating a new ansible inventory for the vagrant machines.
- Distributing ssh-keys from the ansible controller to the controlled servers.
- Destroying and reconstructing the local lab environment ( the local ansible controller, local webserver, and local gitlab-runner ). This is done by destorying and rebuilding vagrant machines, creating and distributing ssh-keys, etc.



### Why `PowerShell` and not `Bash`?


Though I prefer `bash` for a commanline, I must admit that `powershell` is much better for scripting due to its superior modern syntax. Further, `powershell` ( and the entire dotnet platfom ) is open source and cross platform, for more read [the official microsoft documentation about powershell 7]( https://docs.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-70?view=powershell-7.2 ). Finally, powershell is more readable and extremely intuitive and additionally there is nice syntax highlighting available in `vim`.

This decision was after I began to write a bash script for the afforementioned purposes and it was not nearly as coherent as I would like. I like the ability to use functions from my scripts in the commandline, and the addition of these is merely a one line addition to the `powershell` profile :

~~~powershell
	echo 'Import-Module /absolute/path/to/module -Force' >> $Profile
~~~



## Auth0


Since I wanted to learn a bit more about authentication for user interfaces and APIs, I decided I ought to try out `Auth0` on the applications running here. For now it only serves the purpose of allowing only myself to edit articals in the ui markdown editor and protecting sensitive API endpoints ( for instance create, destroy, and update method endpoints ).



