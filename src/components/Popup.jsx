import React, { Component } from "react";
import moment from "moment";
import "./popup.scss";
import { fetchRecipe} from "../gateway";

class PopUp extends Component {
  state = {
    name: "",
    recipe: ""
  };

  componentDidMount() {
    fetchRecipe(this.props.selectRecipe).then(recipeProp =>
      this.setState({
        id: recipeProp.id,
        date: recipeProp.date,
        name: recipeProp.name,
        recipe: recipeProp.recipe[0].descripton,
        recipes: recipeProp.recipe
      })
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCreateRecipe = () => {
    const newRecipe = {
      name: this.state.name,
      date: moment(),
      recipe: [
        {
          descripton: this.state.recipe,
          date: moment()
        }
      ]
    };
    this.props.onCreateRecipe(newRecipe);
  };

  handleUpdateRecipe = () => {
    let newRecipe;
    if (this.state.recipe === this.state.recipes[0].descripton) {
      newRecipe = {
        name: this.state.name,
        date: moment()
      };
    } else {
      newRecipe = {
        name: this.state.name,
        date: moment(),
        recipe: [
          { descripton: this.state.recipe, date: moment() },
          ...this.state.recipes
        ]
      };
    }
    this.props.onUpdateRecipe(this.state.id, newRecipe);
  };

  render() {
    const { onClosePopup, selectRecipe } = this.props;
    const createBtn = (
      <button
        className="add-recipe btn-popup"
        type="submit"
        onClick={() => this.handleCreateRecipe()}
      >
        Create recipe
      </button>
    );

    const updateBtn = (
      <button
        className="add-recipe btn-popup"
        type="submit"
        onClick={() => this.handleUpdateRecipe()}
      >
        Update recipe
      </button>
    );
    return (
      <div className="popup">
        <form action="popup-form" className="popup-form">
          <button className="close btn" onClick={() => onClosePopup(event)}>
            <i className="fas fa-times"></i>
          </button>
          <label htmlFor="name" className="input-label">
            Name
          </label>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={() => this.handleChange(event)}
            className="input-name popup-input"
            required
          />
          <label htmlFor="recipe" className="input-label">
            Recipe
          </label>
          <textarea
            name="recipe"
            value={this.state.recipe}
            onChange={() => this.handleChange(event)}
            id=""
            cols="30"
            rows="10"
            className="input-text popup-input"
            required
          ></textarea>
          {selectRecipe == "" ? createBtn : updateBtn}
        </form>
      </div>
    );
  }
}

export default PopUp;
