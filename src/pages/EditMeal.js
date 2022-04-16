import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

import * as amplify from '../amplify'; 

function EditMeal() {
    const navigate = useNavigate();
    const { user } = useAuthenticator(context => [context.user]);

    // Get params from URL
    const urlParams = useParams();
    const mealId = urlParams.id;
    const mealUser = urlParams.user;

    // Adding new meal
    const [meal, setMeal] = useState([]);
    const [mealName, setMealName] = useState("");
    const [mealIngredients, setMealIngredients] = useState("");
    const [mealSteps, setMealSteps] = useState("");
    const [mealImage, setMealImage] = useState();
    const [imageInput, setImageInput] = useState();

    // Loading state
    const [loading, setLoading] = useState(false);

    // Works
    const updateMeal = async (e) => {
        e.preventDefault();
        let imageUpload;

        if (imageInput === undefined) {
            imageUpload = meal.pictures;
        }
        else {
            await amplify.deleteImage(meal.pictures);
            const upload = await amplify.uploadImage(imageInput);
            imageUpload = upload.key;
        }
        
        await amplify.updateMeal(
            user.username, 
            mealId,
            mealName, 
            mealIngredients, 
            mealSteps, 
            imageUpload
        );
        
       navigate(`/meal/${mealUser}/${mealId}`);
    }

    useEffect( () => {
        async function getSingleMeal() {
            setLoading(true);
            const data = await amplify.getSingleMeal(mealUser, mealId);
            const singleMeal = data.result.Items[0];
            const getImage = await amplify.getImage(singleMeal.pictures); 

            // setting meals values
            setMeal(singleMeal);
            setMealName(singleMeal.mealName);
            setMealIngredients(singleMeal.mealIngredients);
            setMealSteps(singleMeal.mealSteps);
            setMealImage(getImage);

            setLoading(false);
        }
        if (user.username === mealUser) {
            getSingleMeal();
        }
        else {
            navigate("/denied");
        }
    }, [])

    return (
        <main className='container py-12'>
            <h1 className='text-center'>Edit: {mealName}</h1>
            {loading &&
                <p>Loading</p>
            }
            {mealImage &&
                <img src={mealImage} alt={`Image of ${mealName}`} className='mx-auto w-1/2 h-96 object-cover' />
            }
            {meal &&
                <form onSubmit={updateMeal} className='flex flex-col mx-auto md:w-2/4'>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="mealNameInput">Meal Name*</label>
                        <input onChange={ (e) => setMealName(e.target.value) } type="text" placeholder="Meal Name" name="mealNameInput" value={mealName} required />
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="mealIngredientsInput">Ingredients*</label>
                        <textarea onChange={ (e) => setMealIngredients(e.target.value) } name="mealIngredientsInput" rows="6" value={mealIngredients} placeholder="Meal Ingredients" required></textarea>
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor="mealStepsInput">Steps*</label>
                        <textarea onChange={ (e) => setMealSteps(e.target.value) } name="mealStepsInput" rows="6" value={mealSteps} placeholder="Steps" required></textarea>
                    </div>
                    <div className='flex flex-col my-2'>
                        <label htmlFor="mealPicture">Picture</label>
                        <input onChange={ (e) => setImageInput(e.target.files[0]) } type="file" accept="image/*" name="mealPicture" className='border-0 px-0 '/>
                    </div>
                    <button type="submit" className="button">Edit Meal</button>
                    <button onClick={() => navigate(-1)} className="button">Back</button>
                </form>
            }
        </main>
    )
}

export default EditMeal;