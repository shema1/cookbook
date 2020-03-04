import React from "react";
import "./cookbook.scss";
import "../breakpoints.scss";
import CookbookList from "./CookbookList";

const Cookbook = () => {
  return (
    <div className="cookbook">
      <h1 className="cookbook__title">Cookbook</h1>
      <CookbookList />
    </div>
  );
};

export default Cookbook;
