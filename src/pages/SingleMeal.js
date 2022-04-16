import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

import * as amplify from '../amplify'; 

function SingleMeal() {
    let navigate = useNavigate();
    const { user } = useAuthenticator(context => [context.user]);

    // Get params from URL
    const urlParams = useParams();
    const mealId = urlParams.id;
    const mealUser = urlParams.user;

    // Meal
    const [meal, setMeal] = useState([]);
    const [mealIngredients, setMealIngredients] = useState([]);
    const [mealSteps, setMealSteps] = useState([]);
    const [mealImage, setMealImage] = useState();

    // Rating
    const [rating, setRating] = useState(0);
    const [existingRating, setExistingRating] = useState(0);
    
    // Loading state
    const [loading, setLoading] = useState(false);

    // Reload
    const [reload, setReload] = useState(false);

    // Set the rating
    // WORKS
    const createRating = async (e) => {
        e.preventDefault();
        if (existingRating !== undefined && existingRating !== 0 ) {
            await amplify.updateRating(user.username, mealId, rating, mealUser);
        }
        else {
           await amplify.createRating(user.username, mealId, rating, mealUser);
        }
        setReload(!reload);
    }

    // Delete meal
    // WORKS
    const deleteMeal = async (e) => {
        e.preventDefault();
        await amplify.deleteMeal(user.username, mealId);
        await amplify.deleteImage(meal.pictures); 

        navigate("/");
    }

    useEffect( () => {
        async function getSingleMeal() {
            setLoading(true);

            const data = await amplify.getSingleMeal(mealUser, mealId);
            const singleMeal = data.result.Items[0];

            const getImage = await amplify.getImage(singleMeal.pictures);
            
            if (user) {
                const data = await amplify.getUserRating(user.username, mealId);
                // if there is some previous rating, set rating
                if(data.result.Items.length !== 0) {
                    setExistingRating(data.result.Items[0].rating);
                }
                else {
                    setExistingRating(undefined);
                }
            }

            setMeal(singleMeal);
            setMealIngredients(singleMeal.mealIngredients.split("\n"));
            setMealSteps(singleMeal.mealSteps.split("\n"));
            setMealImage(getImage);

            setLoading(false);
        }
        getSingleMeal();
    }, [reload])

    return (
        <main className='container py-12'>
            {loading &&
                <p>Loading</p>
            }

            <h1 className='text-center'>{meal.mealName}</h1>
            <img src={mealImage} alt={`Image of ${meal.mealName}`} className="mx-auto h-96 w-1/2 object-cover"/>
            <div className='mx-auto w-2/4'>
                <p>Author: {meal.userName}</p>
                <p>⭐ {meal.rating}</p>
                <h2>Ingredients</h2>
                <ul>
                    {mealIngredients.map( (ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Steps</h2>
                <ul>
                    {mealSteps.map( (step) => ( 
                        <li key={step}>{step}</li>
                    ))}
                </ul>
                <h3>Give the meal a rating</h3>
                {!user &&
                    <p>Please log in to rate the meal</p>
                }
                
                {user &&
                    <>
                        {existingRating && 
                            <p>You have rated this meal with rating {existingRating}</p>
                        }
                        <form onSubmit={createRating} className='flex flex-col sm:flex-row'>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="0" name="rating" className='cursor-pointer'/>
                                <label className='mx-2'>No rating</label>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="1" name="rating" className='cursor-pointer'/>
                                <label className='mx-2'>1</label>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="2" name="rating" className='cursor-pointer'/>
                                <label className='mx-2'>2</label>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="3" name="rating" className='cursor-pointer' />
                                <label className='mx-2'>3</label>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="4" name="rating" className='cursor-pointer' />
                                <label className='mx-2'>4</label>
                            </div>
                            <div className='flex items-center mr-2'>
                                <input type="radio" onChange={(e) => setRating(e.target.value)} value="5" name="rating" className='cursor-pointer' />
                                <label className='mx-2'>5</label>
                            </div>
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </form>
                    </>
                }

                {user &&
                    user.username === mealUser &&
                        <div className='flex flex-col sm:flex-row'>
                            <Link to={`/meal/${mealUser}/${mealId}/edit`} className="button mr-2">Edit</Link>
                            <button onClick={deleteMeal} className='button border-2 border-red-600 hover:bg-red-600'>Delete Meal</button>
                        </div>
                }

                <Link to="/" className='button'>Back</Link>

            </div>
        </main>
    )
}

export default SingleMeal;