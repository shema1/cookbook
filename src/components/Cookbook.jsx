import React, { Component } from "react";
import "./cookbook.scss";
import CookbookList from "./CookbookList";

const Cookbook = () => {
  return (
    <div className="cookbook">
      <h1 className="cookbook__title">Cookbook</h1>
      {/* <main className="cookbook-list"> */}
        <CookbookList />
      {/* </main> */}
    </div>
  );
};

export default Cookbook;
