React and Laraevl News Feed APIS
============================================


##Set-Up Locally
----------------------
1. Install Docker, verify using ```docker --version```
2. Go to the project root ```your unzip location /```
2. You must be seeing docker-compose.yml and variables.env file
3. Update the required variable values in variables.env
    - NEWS_API_KEY=update_it
    - GUARDIAN_API_KEY=update_it
    - NYTIMES_API_KEY=update_it
4. RUN ```docker-compose build``` to build the composer, docker image
5. RUN ```docker-compose up``` to start the service
6. Verify the service  - http://localhost:3000, http://localhost:8000
7. RUN ```docker-compose down --rmi all``` to stop and clear the residue of the service
8. use variables.env to change the variables for backend service



NOTE: Currently you can save multile preferences , but in search supporting one for simplicity.


