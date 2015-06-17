# Potato Assignemnt

This repo has been created to showcase my application creation and desgin skills to [potato](https://p.ota.to/).

## The Application

You can see a running version of the application running on a heroku server [here](http://lit-harbor-2322.herokuapp.com/#/potato).

The application is a client for the flickr [photo api](https://www.flickr.com/services/api/) that allows you to free text and tag search and keep up on the latest potato photos with a potato tag feed. The result list has infinite scrolling.

## Furture Improvements

Due to time limitations I had to glance over some non-essintial improvements. These improvements are:

1. Improve error handling
	* Hitting the end of the infinite scrolling does not give you a very helpful message.
	* Any http errors would leave the user handing.
	* Many more...
2. Improved usability
	* Going back and forward between photo list and detail should retain position.
	* Search should cache results and page number if we come back from viewing a photo (but not if we come to it fresh) [Done]
3. Accessibility
	* No thought has gone into accessibility, this should be fixed.
4. Improved desgin
	* Although I followed the desgins, I feel there is still a lot to be improved.
5. Better test
	* Both unit and e2e tests.

### Technologies used
The appliciation is written in angularjs backed by a nodejs/express backend. I have used bower to manage the frontend dependacies and grunt to manage development/build (including dependacy injection, livereload, uglifying and sass compilation).

I used [this](https://github.com/DaftMonk/generator-angular-fullstack) yeoman generator to bootstrap the application.

List of technologies used:

* Yemoan
* AngularJs
* Bootstrap
* Sass
* Grunt
	* Compass
	* wiredep and injector
	* Livereload
		* Quick dev time
	* Build 
		* Uglify, concatination, filerev + more
* nodejs
* bower
* npm
* protractor 
* editorconfig
* heroku

## Running the application locally
To run the application locally you must install:

* node & npm
* bower
* grunt-cli
* ruby
* compass

(I'm assuming you know how to install, if not, please ask)

Then do the following:

```
cd REPO_FOLDER
grunt serve
```

## Building and running the applciation

```
cd REPO_FOLDER
grunt build

// To run the application...

cd REPO_FOLDER/dist/server
node app.js

```
