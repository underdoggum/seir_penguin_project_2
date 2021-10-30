# Project 2 Documentation
## By: Nathan Noack

## Introduction
This is a full-stack (MELN) app implementing Model-View-Controller design with RESTful routing.\
\
[See working site here!](https://nn-penguin-project2.herokuapp.com/)


## Technologies Used
#### Basic
 - HTML5
 - CSS3
 - JavaScript ES6

#### Libraries / Techniques
 - MongoDB as a database
 - ExpressJS Routing
 - Liquid Templating for generating dynamic HTML templates
 - NodeJS as a backend server
 - Bulma CSS framework (mobile-first, flexible, and lightweight!)
 - Deployed with Heroku


## User Stories
  - This workout app allows a user to create workouts based on their personal preference
  - It starts with a Day, which has one of three types of exercises (A, B, or C)
  - Then, a user can choose from a list of pre-filled exercises to perform (or create a new exercise), and when choosing, the exercises show a form for entering in their performed weight, number of sets, and number of reps (the numbers for weight/sets/reps are also suggested in the exercise submission form)
   - A user must be able to easily navigate the tree of Days/Workouts/Exercises from any given location in the app


## Models
 - Day:
    - day number ("Day 1", "Day 2", ad infinitum)
    - workout type ("Workout A", "Workout B", or "Workout C")
 - Exercise (a child of the current Day's "workout type"):
    - name of exercise
    - weight number
    - sets number
    - reps number

#### Example
```
App
 ├── Day 1
 │     └── Push Day
 │             ├── Bench press
 │             │        ├── 135 lbs
 │             │        ├── 3 sets
 │             │        └── 10 reps
 │             └── Lateral raises
 │                      ├── 10 lbs
 │                      ├── 4 sets
 │                      └── 12 reps
 ├── Day 2
 │     └── Pull Day
 │             └── Pull-ups
 │                      ├── bodyweight
 │                      ├── 2 sets
 │                      └── 8 reps
 │
 └── Day 3
```


## RESTful Route Table
| Action  | Path      | HTTP Verb | Liquid view filename | Purpose                                                 |
|:-------:|:---------:|:---------:|:--------------------:|:-------------------------------------------------------:|
| Index   | /         | GET       | index.liquid         | List all Days                                           |
| Show    | /:id      | GET       | show.liquid          | Show info about one Day                                 |
| New     | /new      | GET       | new.liquid           | Show a form to complete for creating a new Day          |
| Create  | /         | POST      |                      | Create a new Day, then redirect to root path            |
| Edit    | /:id/edit | GET       | edit.liquid          | Show a form to complete for editing an existing Day     |
| Update  | /:id      | PUT       |                      | Update the edited Day from the "Edit route"             |
| Destroy | /:id      | DELETE    |                      | Delete a specific Day                                   |



## Challenges

 - Problem: How to relate two models in a one-to-many relationship
   Solution: 

 - Problem: Not being able to reference one model from another
   Solution: Use Mongoose's powerful ```.populate("...")``` function to join the data. After figuring out the above, the "Day" model now had data that referenced an array of "Exercise" models, but to actually grab those models, I needed to populate them. D'oh!

 - Problem: I couldn't figure out how to edit the exercises as a whole for each day. I could get to the edit route and update the day, but to edit the exercises, I couldn't just edit them as a sub-document within the ```Day.findById(...)``` query
   Solution: I had to find each exercise within that day, and for each of them, I needed to find the exercise by querying that Exercise model.

 - Problem: The edit routes (for "Day" and "Exercise") were unique routes, but they updated to the same update route (/dayId)
   Solution: Noticing that the request received in ```req.body``` was different depending on the update, I added a simple if statement depending on that input