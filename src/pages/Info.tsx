import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../features/Game.context";

type Props = {};

export default function InfoPage({}: Props) {
  const { categories } = useContext(GameContext);

  return (
    <div className="page-container">
      <Link to="/" className="btn btn-primary btn-exit-top">
        Go Back
      </Link>
      <h1 className="display">Please Select a Category</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.name.toLowerCase()}
            className="category"
          >
            <p className="category-name">{category.name}</p>
            <img
              aria-label={category.name}
              src={"./assets/bins/" + category.imageURL}
            />
          </Link>
        ))}
      </div>
      <div className="sources">
        <h3>Sources:</h3>
        <ul>
          <li><a href="https://switzerlanding.com/recycling/" target="blank" rel="noopener noreferrer">SwitzerLanding</a></li>
          <li><a href="https://studyinginswitzerland.com/recycling-in-switzerland/" target="blank" rel="noopener noreferrer">Studying in Switzerland</a></li>
        </ul>
      </div>
      <small className="copyright">&copy; SmarterWaste</small>
    </div>
  );
}
