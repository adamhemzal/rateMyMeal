import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

import * as amplify from '../amplify'; 

function Main() {
    const { user} = useAuthenticator(context => [context.user]);

    // Store all meals
    const [meals, setMeals] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(false);

    // User name
    const [userName, setUserName] = useState('');

    // Get all meals for all users from the database
    const getAllMeals = async () => {
      setLoading(true);
      // get meals
      const data = await amplify.getAllMeals();
      //console.log(data);
      setMeals(data);
      setLoading(false);
    }

    useEffect( () => {
      getAllMeals();

      if (user) {
        setUserName(user.username.toUpperCase());
      }
    }, [user])

    return (
      <main className='container py-12'>
        <h1 className='text-center mb-3'>🥕 Rate My Meal</h1>

        {user && 
          <>
            <h2>Hello, {userName}</h2>
            <hr />
          </>
        }

        <section className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12'>
          {loading &&
            <p>Loading meals</p>
          }

          {meals.length === 0  &&
            <p className='h-screen'>No meals yet</p>
          }

          {meals &&
            meals.map( (meal) => { 
              const picture = meal.picturesUrl; // here add [0] to display the first image of the array
              //console.log(meal);
              //console.log(picture);
              return (
                <Link to={`/meal/${meal.userName}/${meal.mealId}`} key={meal.mealId} className="transition hover:scale-110 hover:border-0 hover:font-normal">
                  <div className="flex flex-col border rounded shadow">
                    <div className='border-0 h-48 w-full'>
                      <img src={picture} alt={`Image of ${meal.mealName}`} className="border-0 h-full w-full object-cover" />
                    </div>
                    <div className='py-4 px-3'>
                      <p className='font-bold m-0'>{meal.mealName}</p>
                      <p className='text-zinc-400 my-1'>@{meal.userName}</p>
                      <p className='my-1 text-small'>⭐ {meal.rating}</p>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </section>

      </main>
    )
}

export default Main;