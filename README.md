## Torre Mentors

Torre Mentors allows people to get their dream jobs, by providing job searching and mentoring access

This products focus on monetization. It considers two flows: 

1. Referral Aggregation: Provider give money by referral
2. Mentoring Fee: Mentor is charged a comission for every bussines. Alternative the fee can be charged to the end users

The user enters a query composed by Skills (Jobs with any of the skills) and Organizations  (Jobs from any of the orgs) 

![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/search.png?raw=true)

![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/search-light.png?raw=true)
To improve UX in the Opportunities view, I am querien on sizes of 50, and showing 10 by 10. The new 50 are saved in Redux Store,
so if the user goes back it doesn't need to query again the information. I'm also using Skeletons to improve Speed Perceptions.

![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/pagination.png?raw=true)

Then, the user can check details about the Opportunity and see a shuffle of Mentors, which can help her/him to apply to the job.
After selecting the mentor a Credit Card form is display with the rate in the mentor currency, allowing to pay for mentorship.

![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/detail.png?raw=true)


![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/card.png?raw=true)


The database of users and payments remains on Stripe, I add metadata to match with the username of the mentor. 

![alt text](https://github.com/jaimegarcia/torre-plus-jobs/blob/master/images/stripe.png?raw=true)


The Server is composed by 3 microservices:

- Opportunities: Provide list of opportunities and detail of opportunity in suscint way, ready for be used in the front. I'm executing all the mapping here reducing the amount of data proccessed in the front
- Mentors: Provide list of mentors and detail of mentor in suscint way, ready for be use in the front. The service also transform Yearly and Monthly rates in hourly ones to provide the necessary rate for the mentoring
- Payments: Provide connection with Stripe to run payments, it queries the Mentors Microservice to get the rate of the selected mentor. With this approach we protect from the user to change the value of the rate


### Running in Local Environment
For running this project in your local environment you can use yarn, npm or docker-compose. 

The web runs by default in http://localhost:3000
The server with all the microservices runs by default in http://localhost:8080

Running with docker-compose

```bash
# Run with docker-compose
docker-compose up
```


Running with Yarn and/or NPM

```bash
# Get the project
git clone https://github.com/jaimegarcia/torre-plus-jobs

# Enter to the directory
cd torre-plus-jobs

# Enter to the server
cd server
# Install NPM dependencies
npm install

# Then simply start the server
npm start

# Now open another terminal, and go back to the root of the project
cd ..

# Enter to the web
cd web
# Install NPM dependencies
yarn install

# Then simply start the server
yarn start




For running the test, you can use yarn, npm o docker-compose
```bash
# Go to the server folder
cd server

#  Run NPM Test 
npm test

# Go to the wen folder
cd web
#  Run YARN Test
yarn test
```
