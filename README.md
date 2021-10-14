# Welcome to the Dinner Menu Generator! (Very much a work-in-progress)

This is a one-page application written in TypeScript and ReactJS that  
generates a weekly dinner menu based on the meals in a specified MongoDB database.

## Things to note:

### Generated directories

In the root directory, a folder called `compiled_server` will be created (on start) containing  
the compiled backend server files. These are the files that are run when the app is started.

### MongoDB Database Configuration

You will need a `config.ts` file in the `server` directory. This is an example:

> const mongodb_uri = "the connection uri here";
>
> export default mongodb_uri;

## To run the app:

Firstly, in the root directory, run `npm i && cd client && npm i` to install all dependencies.

### `npm start`

Compiles and runs the app.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `nodemon start`

Install nodemon globally `npm i -g nodemon` and run the above command to automatically
compile and run the app using the configuration in the package.json.
