import React, { Component } from "react";
import moment from "moment";

class Recipe extends Component {
  state = {
    openInfo: false
  };

  openAdditionalInfo = () => {
    this.setState({
      openInfo: !this.state.openInfo
    });
  };

  render() {
    const { recipe, onDeleteRecipe, onOpenPopup } = this.props;
    const sortedList = recipe.recipe.sort((a, b) => b.date - a.date);
    return (
      <li
        className={`cookbook-list__recipe ${
          this.state.openInfo ? "cookbook-list__recipe_open" : ""
        }`}
      >
        <div className="recipe-header">
          <div className="recipe-info">
            <span className="recipe-name">{recipe.name}</span>
            <button
              className="recipe-more btn"
              onClick={this.openAdditionalInfo}
            >
              <i className="far fa-caret-square-down"></i>
            </button>
            <span className="recipe-date">
              {moment(recipe.date).format("MMM D YYYY, hh:mm:ss")}
            </span>
          </div>
          <div className="recipe-control">
            <button
              className="recipe-update btn"
              onClick={() => onOpenPopup(recipe.id)}
            >
              <i className="far fa-edit"></i>
            </button>
            <button className="recipe-delete btn">
              <i
                className="far fa-trash-alt"
                onClick={() => onDeleteRecipe(recipe.id)}
              ></i>
            </button>
          </div>
        </div>
        <div
          className={`recipe-body ${
            this.state.openInfo ? "item-open" : "hide"
          }`}
        >
          <ul className="recipe-history">
            {sortedList.map(history => (
              <li className="recipe-history__item" key={Math.random()}>
                <p className="recipe-history__date">
                  {moment(history.date).format("MMM D YYYY, hh:mm:ss")}
                </p>
                <span className="recipe-history__description">
                  {history.descripton}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }
}

export default Recipe;
