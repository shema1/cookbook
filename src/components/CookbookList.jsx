import React, { Component, PureComponent } from "react";
import Recipe from "./Recipe";
import "./cookbookList.scss";
import PopUp from "./Popup";
import {
  createRecipe,
  fetchRecipeList,
  deleteRecipe,
  updateRecipe
} from "../gateway";

class CookbookList extends Component {
  state = {
    selectRecipeId: "",
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
  };

  onOpenPopup = recipeId => {
    if (typeof recipeId === "string") {
      this.setState({
        selectRecipeId: recipeId
      });
    }
    this.setState({
      popupIsOpen: true
    });
  };

  onClosePopup = () => {
    this.setState({
      popupIsOpen: false,
      selectRecipeId: ""
    });
  };

  onCreateRecipe = rcipe => {
    this.onClosePopup();
    createRecipe(rcipe).then(() => this.fetchRecipe());
  };

  onUpdateRecipe = (id, recipe) => {
    this.onClosePopup();
    updateRecipe(id, recipe).then(() => this.fetchRecipe());
  };

  onDeleteRecipe = id => {
    deleteRecipe(id).then(() => this.fetchRecipe());
  };

  render() {
    return (
      <>
        <button className="add-recipe" onClick={this.onOpenPopup}>
          <i className="fas fa-plus"></i>add new recipe
        </button>
        <ul className="cookbook-list">
          {this.state.recipes
            .sort((a, b) => b.date - a.date)
            .map(recipe => (
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
            selectRecipe={this.state.selectRecipeId}
          />
        )}
      </>
    );
  }
}

export default CookbookList;
