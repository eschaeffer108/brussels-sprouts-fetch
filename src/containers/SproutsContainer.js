import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomRecipe: "",
      recipes: [],
      clickButton: ""
    }
  }

  getRandomRecipe() {
     fetch("/api/v1/random-recipe")
     .then(response => {
       if(response.ok) {
         return response;
       } else {
         let error = new Error("Error in fetch: GET '/api/v1/random-recipe'");
         throw(error);
       }
     })
     .then(response => {
         return response.text();
     })
     .then(data => {
       this.setState({
         randomRecipe: data,
         clickButton: "RANDOM"
       });
     })
     .catch(error => {
       console.error(error);
     });
   };

   getAllRecipes() {
       fetch("/api/v1/recipes")
       .then(response => {
         if(response.ok) {

           return response;
         } else {
           let error = new Error("Error in fetch: GET '/api/v1/recipes'");
           throw(error);
         }
       })
       .then(response => {
           return response.json();
       })
       .then(data => {
         this.setState({
           recipes: data,
           clickButton: "ALL"
         });
       })
       .catch(error => {
         console.error(error);
       });
     };

  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.randomRecipe}
        />
        <SproutsIndex
          recipes={this.state.recipes}
        />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
