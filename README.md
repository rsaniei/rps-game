## RPS-game

This application is a "Rock Paper Scissors" game.

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

## Folder Structure

After creation, your project should look like this:

```
rps-game/
  frontend/
  backend/
  README.md
```

## Run the App

to run the application you should go to the frontend and backend folders one by one
and do the installation.
starting from the root, first go to the backend folder:

`cd backend`

Then install the packages by running:

`npm install`

To Start Server, simply run:

`npm run dev`

Please note that the backend automatically runs on port 8000. If you want to change this port you should first, change the `PORT` variable in `backend/.env` and then change the the port of `proxy` in `frontend/package.json` from `8000` to another port number.

Now, do the same for the frontend. Starting from the root directory, run:

`cd frontend`

Then install the packages by running:

`npm install`

Finally, to run the application on frontend:

`npm run start`

To visit app, go to the:

`localhost:3000`

Run the following commands for running the tests:

`npm run test`

## Contact

If you have any question, please contact me via `saniei.r@gmail.com`.
