import React, { Component, PureComponent } from "react";
import Recipe from "./Recipe";
import "./cookbookList.scss";
import PopUp from "./Popup";
import {
  createRecipe,
  fetchRecipeList,
  deleteRecipe,
  fetchRecipe,
  updateRecipe
} from "../gateway";

class CookbookList extends Component {
  state = {
    selectRecipe: "",
    popupIsOpen: false,
    recipes: []
  };

  componentDidMount() {
    this.fetchRecipe();
  }

  fetchRecipe = () => {
    fetchRecipeList().then(recipesList =>
      this.setState({
        recipes: recipesList
      })
    );
    console.log("fetch recipe work");
  };

  onOpenPopup = recipeId => {
    if (typeof recipeId !== "object") {
      this.setState({
        selectRecipe: recipeId
      });
    }
    this.setState({
      popupIsOpen: true
    });
  };

  onClosePopup = () => {
    this.setState({
      popupIsOpen: false,
      selectRecipe: ""
    });
  };

  onCreateRecipe = rcipe => {
    this.onClosePopup()
    createRecipe(rcipe).then(() => this.fetchRecipe());
  };

  onUpdateRecipe = (id,recipe) =>{
    this.onClosePopup()
    updateRecipe(id,recipe).then(()=>this.fetchRecipe())
  }

  onDeleteRecipe = id => {
    deleteRecipe(id).then(() => this.fetchRecipe());
  };

  // getIdRecipe = id => {
  //   fetchRecipe(id);
  //   setState({
  //     selectRecipe: id
  //   });
  // };

  render() {
    return (
      <>
        <button className="add-recipe" onClick={this.onOpenPopup}>
          <i className="fas fa-plus"></i>add new recipe
        </button>
        <ul className="cookbook-list">
          {this.state.recipes.map(recipe => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onOpenPopup={this.onOpenPopup}
              onDeleteRecipe={this.onDeleteRecipe}
            />
          ))}
        </ul>
        {this.state.popupIsOpen && (
          <PopUp
            isOpen={this.state.popupIsOpen}
            onClosePopup={this.onClosePopup}
            onCreateRecipe={this.onCreateRecipe}
            onUpdateRecipe={this.onUpdateRecipe}
            selectRecipe={this.state.selectRecipe}
          />
        )}
      </>
    );
  }
}

export default CookbookList;
