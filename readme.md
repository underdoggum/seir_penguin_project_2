# Project 2 Documentation
## By: Nathan Noack

## Introduction
This is a full-stack (MELN) app implementing Model-View-Controller design with RESTful routing.\
\
**[See working site here!](https://nn-penguin-project2.herokuapp.com/)**


## Technologies Used
#### Core
 - HTML5
 - CSS3
 - JavaScript ES6

#### Libraries / Techniques
 - MongoDB as a database
 - ExpressJS Routing
 - Liquid Templating for generating dynamic HTML templates
 - NodeJS as a backend server
 - Bulma CSS framework (mobile-first, flexible, lightweight)
 - Deployed with Heroku
 - Interfacing with YouTube API v3


## User Stories
 - Overall, the user should be able to create a Pull/Push/Legs workout split based on their personal preference and log that data

 - The user starts adding data with a Day, which has one of three types of exercises (Pull, Push, or Legs)

 - Then, the user should choose from a list of pre-filled exercises to perform (or edit them), and when choosing, the exercises show a form for entering in their performed weight, number of sets, and number of reps (the numbers for new weight/sets/reps are also suggested in the exercise submission form)

 - A user must be able to easily navigate the tree of Days/Workouts/Exercises from any given location in the app


#### Special Features
 - Users can change individual exercises and check their form beforehand via the quick YouTube video link beside the exercise


## Models
 - Day:
    - day number ("Day 1", "Day 2", ad infinitum)
    - workout type ("Pull", "Push", or "Legs")
    - exercises (an array of exercises ObjectIDs from the Exercise Schema below)
    - username (for making days depend on the user logged in)

 - Exercise (a child of the current Day's "workout type"):
    - name of exercise
    - weight number
    - sets number
    - reps number
    - day (with ObjectID pointing to the Day model above)

 - User:
    - username
    - password


#### Example
```
App
 ├── Day 1
 │     └── Push Day
 │             ├── Bench press
 │             │        ├── 135 lbs
 │             │        ├── 3 sets
 │             │        └── 10 reps
 │             ├── Lateral raises
 │             │        ├── 10 lbs
 │             │        ├── 4 sets
 │             │        └── 12 reps
 │             └ ...
 ├── Day 2
 │     └── Pull Day
 │             ├── Deadlift
 │             │        ├── 225 lbs
 │             │        ├── 3 sets
 │             │        └── 8 reps
 │             └ ...
 └── ...
```


## Route Tables
#### RESTful Routes
| Action         | Path                        | HTTP Verb | Liquid view filename  | Purpose                                                                        |
|:--------------:|:---------------------------:|:---------:|:---------------------:|:------------------------------------------------------------------------------:|
| Index          | /days                       | GET       | days/index.liquid     | List all Days                                                                  |
| Show           | /days/:dayId                | GET       | days/show.liquid      | Show info about one Day                                                        |
| New            | /days/new                   | GET       | days/new.liquid       | Show a form to complete for creating a new Day                                 |
| Create         | /days                       | POST      |                       | Create a new Day, then redirect                                                |
| Edit Exercises | /days/:dayId/edit_exercises | GET       | exercises/edit.liquid | Show a form to complete for editing exercises                                  |
| Edit Days      | /days/:dayId/edit           | GET       | days/edit.liquid      | Show a form to complete for editing a Day                                      |
| Update         | /days/:dayId                | PUT       |                       | Update the edited Day OR the edited exercises from the respective "Edit route" |
| Destroy        | /days/:dayId                | DELETE    |                       | Delete a specific Day                                                          |

#### Other Routes
| Action         | Path                        | HTTP Verb | Liquid view filename  | Purpose                                                                        |
|:--------------:|:---------------------------:|:---------:|:---------------------:|:------------------------------------------------------------------------------:|
| Auth           | /signup                     | GET       | auth/signup.liquid    | Show a form for a user to sign up                                              |
| Auth           | /signup                     | POST      |                       | Create a new user, then redirect to login page                                 |
| Auth           | /login                      | GET       | auth/signup.liquid    | Show a form for a user to log in                                               |
| Auth           | /login                      | POST      |                       | Confirm the login credentials, then redirect to main page                      |



## Challenges
 - Problem: Not being able to reference one model from another
   Solution: Use Mongoose's powerful ```.populate("...")``` function to join the data. After figuring out the above, the "Day" model now had data that referenced an array of "Exercise" models, but to actually grab those models, I needed to populate them. D'oh!

 - Problem: I couldn't figure out how to edit the exercises as a whole for each day. I could get to the edit route and update the day, but to edit the exercises, I couldn't just edit them as a sub-document within the ```Day.findById(...)``` query
   Solution: I had to find each exercise within that day, and for each of them, I needed to find the exercise by querying that Exercise model.

 - Problem: The edit routes (for "Day" and "Exercise") were unique routes, but they updated to the same update route (/dayId)
   Solution: Noticing that the request received in ```req.body``` was different depending on the update, I added a simple if statement depending on that input

 - Problem: When confirming Day deletion, user is still able to click unrelated buttons because the popup confirmation is just a visibility toggle on the notification
   Solution: Implement a generic modal with z-index above all other elements except the delete confirmation popup


## Known Bugs
 - When user changes a specific exercise and submits changes, it doesn't *always* update immediately upon redirect, but refreshing the page confirms that the change was actually made

 - YouTube API v3 implementation ("google.discovery.Discovery.GetDiscoveryRest") becomes easily flooded with requests during testing, exceeding the daily request quota limit

 - Logout button is only clickable in bottom half of button

 - ~~Exercise table is overflowing the container on iPhone 5 screen, looks ugly~~

 - ~~When a day's workout type is set to "Rest" and submitted as such, if the user changes to any other workout type, it won't populate the exercise data~~
 
 - ~~Change YouTube query to include only responses for "sports" category instead of general categories~~
 
 - ~~Users other than "admin" don't have the correct "New Day" suggestion~~


## Extra Features for the Future:
 - When creating a new Day, automatically suggest weight increase of 5% (rounded to nearest 5 lb increment) of the previous weight
   - This requires adding a "count" property to the Exercise mongoose schema to be able to calculate new suggested weight from previous weight

 - Ability to fully add/delete exercise items on ".../edit_exercises" page

 - Ability to graph progress on Day show page (GraphJS)