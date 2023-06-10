import React, { useState, useEffect } from 'react';
import { CiPizza } from 'react-icons/ci';
import { GiFruitBowl, GiNoodles, GiCheckMark } from 'react-icons/gi';
import { MdOutlineIcecream } from 'react-icons/md';
import { fetchTabData } from '../Service';
import ErrorBoundary from '../ErrorBoundary';
import Button from 'react-bootstrap/Button';

function Tabs({ setLoader, setSelectedTab, selectedRecipe }) {
  const [active, setActive] = useState('Pizza');
  const [tabData, setTabData] = useState('');
  const [tabLabel, setTabLabel] = useState([
    {
      name: 'Pizza',
      icon: <CiPizza />,
      id: '0209cb28fc05320434e2916988f47b71',
    },
    {
      name: 'Noodles',
      icon: <GiNoodles />,
      id: 'a243e3cd56da95b31e5a86ef52578908',
    },
    {
      name: 'Dessert',
      icon: <GiFruitBowl />,
      id: '8a43f4ae96324cc7e940fe2a5990efc5',
    },
    {
      name: 'Ice Cream',
      icon: <MdOutlineIcecream />,
      id: '480fd56ab4d71c204c2b75e16edbbd21',
    },
  ]);

  const handleClick = (name, id) => {
    setActive(name);
    setSelectedTab(name);
    fetchTabData(id)
      .then((response) => {
        setTabData(response);
        console.log(response);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error fetching tab data:', error);
      });
  };

  useEffect(() => {
    if (selectedRecipe) {
      setTabData({ recipe: selectedRecipe });
    } else {
      fetchTabData(tabLabel[0].id)
        .then((response) => {
          setTabData(response);
          setLoader(false);
        })
        .catch((error) => {
          console.error('Error fetching tab data:', error);
        });
    }
  }, [selectedRecipe, tabLabel]);
  

  return (
    <ErrorBoundary>
      <div className="container">
        <h1 className="recipeHeading">What would you like to have!</h1>
        <div className="tabs">
          {tabLabel.map((item, index) => (
            <div
              onClick={() => (handleClick(item.name, item.id), setLoader(true))}
              key={index}
              className={`tablist ${active === item.name ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="recipe_banner">
    {tabData && (
      <div className="left-col">
        {tabData.recipe ? ( // Added check for tabData.recipe
          <>
            <span className="badge">
              {tabData.recipe.cuisineType
                ? tabData.recipe.cuisineType[0].toUpperCase()
                : ''}
            </span>
            <h1>{tabData.recipe.label}</h1>
            <p>
              <strong>Recipe by:</strong>
              <small>{tabData.recipe.source}</small>
            </p>
            <h3>Ingredients</h3>
            <div className="ingredients">
              <ul>
                {tabData.recipe.ingredientLines.map((list, index) => (
                  <li key={index}>
                    <GiCheckMark size="18px" color="#6fcb9f" />
                    <span>{list}</span>
                  </li>
                ))}
              </ul>
            </div>
                          {/* <a type='button' href={tabData.recipe.url} target='_blank'>Recipe URL</a> */}

                          <Button style={{ backgroundColor: '#6FCB9F', borderColor: '#6FCB9F' }} as="a" href={tabData.recipe.url} target="_blank">Recipe URL</Button>{' '}


          </>
        ) : (
          <p>No recipe selected</p> // Added fallback message for when tabData.recipe is null or undefined
        )}
      </div>
    )}
    {tabData && (
      <div className="right-col">
        <div className="image-wrapper">
          {tabData.recipe && tabData.recipe.image ? ( // Added check for tabData.recipe.image
            <img src={tabData.recipe.image} alt={tabData.recipe.label} />
          ) : (
            <p>No image available</p> // Added fallback message for when tabData.recipe.image is null or undefined
          )}
        </div>
      </div>
    )}
  </div>
      </div>
    </ErrorBoundary>
  );
}

export default Tabs;





