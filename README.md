# Blockhouse Technical Assignment using Next.js Dashboard with Django Backend

## Setup Instructions

### Prerequisites

- Docker

### Running the Application

1. Unzip folder

2. Build and start the Docker containers:
   ```
   docker-compose build
   
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000

## Libraries and Tools Used

### Frontend
- Next.js for User Interface
- Recharts library for charts
- Tailwind CSS for stylizing the page

### Backend
- Django for storing the information for the charts
- Django REST Framework for the API
- django-cors-headers for handling resource sharing

### Development and Deployment
- Docker for creating containers which help making building and running easier

## Approach and Thought Process

My approach to this project was to start with the front end and see how far I could go with creation before needing to 
implement the database. I started with getting a base down for the interface and creating places for the graphical data to 
appear and sorting out the basic style using the in line css that Next.js provides. I also made sure that the page fits WCAG 2 
accessibility standards for at least the colors and background in order to ensure readability.

Next it was time to implment the back end, I had never used Django for databases before so it took a little learning and a 
lot of sturggling to get it up and running with the data needed for the graphs to be added to the database. Then came time 
for working on the REST API which also took some time to get up and working but I was eventually able to implement it.

Then came to making sure that the graphs on the interface displayed the data correctly, the first three charts(Line, Bar and 
Pie) came out right away and displayed well but the Candlestick chart did not, I looked into it and tried to figure out a 
way to display it but it would not format correctly or sometimes at all, so after a few hours I needed to move on from it, 
so there is a lot of left over frankenstein code for the candlestick chart that didn't work out.

I then went on to create dockerfiles for both the frontend and backend in order to containerize the program and simplify 
building and running it for anyone who wants to open it up and see the work, this part was pretty simple as its just setting up 
docker and making sure that it has correct commands in each file.

In the end my approach went frontend, backend, rework frontend, then containerize. This project was a cool challenge and it got me 
out of my comfort zone and introduced me to a database system I had not previously used.
