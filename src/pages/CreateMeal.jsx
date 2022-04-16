import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

import * as amplify from '../amplify'; 

// WORKS
function CreateMeal() {
    let navigate = useNavigate();
    const { route, user } = useAuthenticator((context) => [context.route, context.user]);

    // Adding new meal
    const [mealName, setMealName] = useState("");
    const [mealIngredients, setMealIngredients] = useState("");
    const [mealSteps, setMealSteps] = useState("");
    const [image, setImage] = useState();

    // Loading state
    const [loading, setLoading] = useState(false);

    const createMeal = async (e) => {
        e.preventDefault();
        
        // it gives you a .key attr which you have to store in the DB
        const imageUpload = await amplify.uploadImage(image); 
        //const imageUrl = await amplify.getImage(imageUpload.key);
        
        await amplify.createMeal(
            user.username, 
            mealName, 
            mealIngredients, 
            mealSteps, 
            imageUpload.key
        );

        // clear inputs
        setMealName("");
        setMealIngredients("");
        setMealSteps("");
        setImage();
        e.target.mealNameInput.value = "";
        e.target.mealIngredientsInput.value = "";
        e.target.mealStepsInput.value = "";
        e.target.mealPicture.value = "";

        navigate("/");
    }

    useEffect( () => {
        // disallow unauthenticated users to create new meal
        if (route !== 'authenticated' || !user) {
          navigate("/denied");
        }
    }, [route])

    return (
        <main className='container py-12'>
            <h1 className='text-center mb-3'>Create a new meal</h1>

            <form onSubmit={createMeal} className='flex flex-col mx-auto md:w-2/4'>
                <div className='flex flex-col my-2'>
                    <label htmlFor="mealNameInput">Meal Name*</label>
                    <input onChange={ (e) => setMealName(e.target.value) } type="text" placeholder="Meal Name" name="mealNameInput" required />
                </div>

                <div className='flex flex-col my-2'>
                    <label htmlFor="mealIngredientsInput">Ingredients*</label>
                    <textarea onChange={ (e) => setMealIngredients(e.target.value) } name="mealIngredientsInput" rows="6" placeholder="Meal Ingredients" required></textarea>
                </div>

                <div className='flex flex-col my-2'>
                    <label htmlFor="mealStepsInput">Steps*</label>
                    <textarea onChange={ (e) => setMealSteps(e.target.value) } name="mealStepsInput" rows="6" placeholder="Steps" required></textarea>
                </div>
                <div className='flex flex-col my-2'>
                    <label htmlFor="mealPicture">Picture*</label>
                    <input onChange={ (e) => setImage(e.target.files[0]) } type="file" accept="image/*" name="mealPicture" required className='border-0 px-0 '/>
                </div>
                <button type="submit" className="button">Create Meal</button>
            
            </form>
        </main>
    )
}

export default CreateMeal;