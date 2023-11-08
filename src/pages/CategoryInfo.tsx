import React, { useEffect, useState, useContext, Fragment } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Category } from "../features/Game.reducer";

import { GameContext } from "../features/Game.context";

type Props = {};

export default function CategoryInfo({}: Props) {
  const { categories } = useContext(GameContext);
  const { category: categoryParams } = useParams();
  const [categoryData, setCategoryData] = useState<Category | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.name.toLowerCase() === categoryParams
    );

    if (!selectedCategory) {
      navigate("/info");
    } else {
      setCategoryData(selectedCategory);
    }
  }, [categoryParams]);

  function onGoBackClick(){
    navigate(-1);
  }

  return (
    <div className="page-container page-container--info">
      <Link to="" onClick={onGoBackClick} className="btn btn-primary btn-exit-top">
        Go Back
      </Link>
      <div>
      <h1 className="display">{categoryData?.name}</h1>
      <p className="info-description">{categoryData?.description}</p>
      </div>
      <div>
        <h2 className="examples-title">
          Examples of {categoryData?.name} Waste
        </h2>
        <div className="examples">
          {categoryData &&
            categoryData.examples.map((example, index) => (
              <figure className="example" key={index}>
                <img
                  className="example-img"
                  src={"./assets/images/" + example.imageURL}
                />
                <figcaption className="h4">{example.name}</figcaption>
              </figure>
            ))}
        </div>
      </div>
      <small className="copyright">&copy; SmarterWaste</small>
    </div>
  );
}
