//import AWS from "aws-sdk";
import Amplify, { API, Storage } from "aws-amplify";
import awsExports from "./aws-exports";
//import * as mapboxgl from 'mapbox-gl';

Amplify.configure(awsExports);


/*****************************
 * API: taskListApp - You can find the name in API Gateway
 *****************************/
const apiName = "rateMyMealAPI";

/*****************************
 * S3 BUCKET - IMAGES
 *****************************/

function randomString(bytes = 16) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes))).map(b => b.toString(16)).join("")
};

// Works
// POST IMAGE
export async function uploadImage(image) {
  const result = await Storage.put(randomString(), image);
  return result
};

// Works
// GET IMAGE
export async function getImage(name) {
  const url = await Storage.get(name);
  return url;
};

// Works
// DELETE IMAGE
export async function deleteImage(name) {
  const url = await Storage.remove(name);
  return url;
};

/*****************************
 * GET MEALS
 *****************************/
// Works
// Get All Meals for All Users
export async function getAllMeals() {
  const path = "/meals";
  const data = await API.get(apiName, path); //get method
  
  return await Promise.all(data.result.Items.map( async item => {
    const picturesUrl = await Storage.get(item.pictures);
    return { ...item, picturesUrl };
  }));
};

// Works
// Get Single Meal
export async function getSingleMeal(userName, mealId) {
  const path = `/meals/${userName}/${mealId}`;
  const data = await API.get(apiName, path); //get method
  //console.log("get single meal", data);
  return data;
};

// Works
// Get User's rating
export async function getUserRating(userName, mealId) {
  const path = `/meals/${userName}/${mealId}/rating`;
  const data = await API.get(apiName, path); //get method
  //console.log("get user's rating", data);
  return data;
};

/*****************************
 * POST (CREATE NEW)
 *****************************/
// Works
export async function createMeal(userName, mealName, mealIngredients, mealSteps, pictures) {
  const path = `/meals`;
  const data = await API.post(apiName, path, {
    body: { 
      userName, 
      mealName,
      mealIngredients,
      mealSteps,
      pictures // must send pictures as an array if you want to see more pictures
    },
  });
  //console.log("create new meal", data);
  return data.result;
};

// Need to test it
export async function createRating(userName, mealId, rating, userMealAuthor) {
  const path = `/meals/${userMealAuthor}/${mealId}`;
  const data = await API.post(apiName, path, {
    body: {
      userName,
      rating
    },
  });
  console.log("new rating", data);
  return data;
};


/*****************************
 * DELETE MEAL
 *****************************/
// Works
export async function deleteMeal(userName, mealId) {
  const path = `/meals/${userName}/${mealId}`;
  const data = await API.del(apiName, path);
  //console.log("delete meal", data);
  return data;
};


/*****************************
 * UPDATE
 *****************************/
// Works
export async function updateMeal(userName, mealId, mealName, mealIngredients, mealSteps, pictures) {
  const path = `/meals/${userName}/${mealId}/edit`;
  const data = await API.put(apiName, path, {
    body: { 
      userName, 
      mealId,
      mealName,
      mealIngredients,
      mealSteps,
      pictures // must send pictures as an array if you want to see more pictures
    },
  });
  console.log("update meal", data);
  return data;
};

// Works
export async function updateRating(userName, mealId, rating, userMealAuthor) {
  const path = `/meals/${userMealAuthor}/${mealId}/rating`;
  const data = await API.put(apiName, path, {
    body: {
      userName,
      rating
    },
  });
  //console.log("updated rating", data);
  return data;
};
