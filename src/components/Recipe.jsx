    import React, { useEffect, useState } from 'react'
    import { BsSearch } from 'react-icons/bs';
    import { fetchData } from '../Service'
    import ErrorBoundary from '../ErrorBoundary';
    import Button from 'react-bootstrap/Button';
    import Card from 'react-bootstrap/Card';


    function RecipeLists({ setLoader, selectedTab, setSelectedRecipe }) {
    const [searchedTerm, setSearchedTerm] = useState('');
    const [data, setData] = useState('');

    const searchRecipe = (searchQuery) => {
        fetchData(searchQuery).then((response) => {
        setData(response);
        // console.log(response);
        setLoader(false);
        })
    }

    const handleRecipeClick = (recipe) => {
        setLoader(true);
        setSelectedRecipe(recipe);
        setTimeout(() => {
          setLoader(false);
        }, 3000); // 5 seconds delay before turning off the loader
      };
    
    

    useEffect(() => {
        fetchData(selectedTab).then((response) => {
        setData(response);
        setLoader(false);
        });
    }, [selectedTab]);

    const HandleSearchButton = (e) => {
        if (e.key === 'Enter') {
        searchRecipe(searchedTerm);
        setLoader(true);
        }
    };

    return (
        <ErrorBoundary>
        <div className='container'>
            <div className='heading-line'>
            <strong>Search Recipes</strong>
            <div className='input-wrapper' >
                <input
                onChange={(e) => setSearchedTerm(e.target.value)}
                onKeyDown={HandleSearchButton}
                value={searchedTerm}
                type="text" placeholder='Search your recipe' />
                <button
                onClick={() => (searchRecipe(searchedTerm), setLoader(true))}
                ><BsSearch /></button>
            </div>
            </div>
            <div className="flexbox">
    {data && data.hits && data.hits.length > 0 ? (
        data.hits.map((item, index) => ( 
        <div
            key={index}
            className="flexItem"
            onClick={() => handleRecipeClick(item.recipe)}
        >
            <Card style={{border:'none'}} className="img-wrapper">
      <Card.Img variant="top" src={item.recipe.image} alt={item.recipe.label} />
      <Card.Body>
        <Card.Text>{item.recipe.label}</Card.Text>
        <Button style={{ backgroundColor: '#6FCB9F', border:'#6FCB9F'}} as="a" href={item.recipe.url} target="_blank" >Recipe URL</Button>
      </Card.Body>
    </Card>
            {/* <div className="img-wrapper">
            <img src={item.recipe.image} alt={item.recipe.label} />
            </div>
            <p>{item.recipe.label}</p> */}
        </div>
        ))
    ) : (
        <p>No recipes found</p>
    )}
    </div>
        </div>
        </ErrorBoundary>
    )
    }

    export default RecipeLists;
