# E-Cookbook

### Technologies used for this project:
* [Sass](https://sass-lang.com/)
* [React](https://reactjs.org/)
* [json-server](https://github.com/typicode/json-server)

### Configuration

In order to run this project on your desktop you will have to:
* clone the repository
* navigate to directory where you had clone the repo
* install node modules ```npm install```
* install json-server ```npm install -g json-server```
* in the directory type ```json-server --watch ./recipes/db.json```
* in another terminal run the app ```npm run start```

### Functionality
* in the Home section recipes from json-server are loaded
* if recipe stored in db has isVegetarian property set to true, leaf on the recipe has green color otherwise is grey
* main focus is that the user can filter recipes by ingredients list placed in search bar
* user can turn on checkbox which will show only the vegetarian recipes
* user can login or register
* once user is logged/register his name is shown next to user icon and will stay there even if user refresh the page
* user can log out
* when user is logged in he can like or dislike any recipe by clicking a heart next to it
* if recipe has at least one like it's color turn from grey to red
* when recipe is clicked more details about it is shown (author, ingredients, instructions etc.)
* user can add any recipe to his favorites list and then at any time remove it from the list
* logged user can add his own recipe by clicking the add button and filling in the form
* on recipe added by user is remove button so user can delete this recipe at any time
<br/>
![Alt text](./images/Home.png?raw=true "Home View")
<br/>
![Alt text](./images/Search.png?raw=true "Search View")
<br/>
![Alt text](./images/Vegetarian.png?raw=true "Vegetarian View")
<br/>
![Alt text](./images/Login.png?raw=true "Login View")
<br/>
![Alt text](./images/Add.png?raw=true "Add View")
<br/>
![Alt text](./images/Details.png?raw=true "Details View")
<br/>
![Alt text](./images/Favorites.png?raw=true "Favorites View")


