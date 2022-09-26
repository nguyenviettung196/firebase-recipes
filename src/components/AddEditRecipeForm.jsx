import React, { useState, useEffect } from 'react';


const AddEditRecipeForm = ({
  existingRecipe,
  handleAddRecipe,
  handleUpdateRecipe,
  handleEditRecipeCancel }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [directions, setDirections] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [publishDate, setPublistDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setPublistDate(existingRecipe.publishDate.toISOString().split('T')[0]);
      setIngredients(existingRecipe.ingredients);
    } else {
      resetForm();
    }

  }, [existingRecipe]);

  function handleAddIngredient(e) {
    //function get call each time we enter a new key
    if (e.key && e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    if (!ingredientName) {
      alert('Missing ingredient field.Please check!');
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName('');

  }

  function handleRecipeFormSubmit(e) {

    e.preventDefault();
    if (ingredients.length === 0) {
      alert('Ingredients cannot be empty.PLease add at least 1 ingredient');
      return;
    }
    const isPublished = new Date(publishDate) <= new Date() ? true : false;
    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients
    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
    }
    resetForm();
  }

  function resetForm() {
    setName('');
    setCategory('');
    setDirections('');
    setPublistDate('');
    setIngredients([]);
  }



  return (
    <form onSubmit={handleRecipeFormSubmit} className='add-edit-recipe-form-container'>
      {existingRecipe ? <h2>Update the Recipe</h2> : <h2>Add a new Recipe</h2>}

      <div className='top-form-section'>
        <div className='fields'>
          <label className='recipe-label input-label'>
            Recipe Name:
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className='input-text' />
          </label>
          <label className='recipe-label input-label'>Category:
            <select value={category} onChange={e => setCategory(e.target.value)} className='select' required>
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">Breads,Sanwitches,Pizza</option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="desserts">Desserts</option>
              <option value="seafoods">Seafoods</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className='recipe-label input-label'>
            Directions:
            <textarea required value={directions} onChange={e => setDirections(e.target.value)} className='input-text directions'></textarea>
          </label>
          <label className='recipe-label input-label'>
            Publish Date:
            <input type="date" required value={publishDate} onChange={e => setPublistDate(e.target.value)} className='input-text' />
          </label>
        </div>
      </div>
      <div className='ingredients-list'>
        <h3 className='text-center'>Ingredients</h3>
        <table className='ingredients-table'>
          <thead>
            <tr>
              <th className='table-header'>Ingredient</th>
              <th className='table-header'>Delete</th>
            </tr>
          </thead>
          <tbody >{ingredients && ingredients.length > 0 ? ingredients.map(ingredient => {
            return (<tr key={ingredient}>
              <td className='table-data text-center'>{ingredient}</td>
              <td className='ingredient-delete-box'>
                <button type='button' className='secondary-button ingredient-delete-button'>Delete</button>
              </td>
            </tr>);
          }) : null}</tbody>
        </table>
        {
          ingredients && ingredients.length === 0 ? <h3 className='text-center no-ingredients'>No Ingredients Added Yet</h3> : null
        }
        <div className='ingredient-form'>
          <label className='ingredient-label'>
            Ingredient:
            <input type="text" value={ingredientName} onChange={e => setIngredientName(e.target.value)} onKeyPress={handleAddIngredient} className='input-text' placeholder='ex. 1 cup of tea' />
          </label>
          <button className='primary-button add-ingredient-button' onClick={handleAddIngredient} type='button'>Add ingredient</button>
        </div>
      </div>
      <div className='action-buttons'>
        <button type='submit' className='primary-button action-button'>{existingRecipe ? 'Update Recipe' : 'Create Recipe'}</button>
        {existingRecipe ? (
          <>
            <button type='button' onClick={handleEditRecipeCancel} className='primary-button action-button'>Cancel</button>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default AddEditRecipeForm;