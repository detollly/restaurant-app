import React , {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import Cart from "./Cart";
import styled from 'styled-components'


const Menu = ( {addItem, removeItem, quantities} ) => {
    const [menuList, setMenuList] = useState([]);
    const [baseCategories, setBaseCategories] = useState([]); 
    const [category, setCategory] = useState('all');

    // Error handling
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false); 

    async function getMenuItems() {

        setIsLoading(true); 

        fetch('https://djevelyn.helioho.st/menu/items/all?key=123')
        .then(response => 
        {
          setIsLoading(false);

          if (response.ok)
            return response.json();
          else
            throw new Error(`HTTP error! status: ${response.status}`);
          
        })
        .then(data => { setMenuList(data) })
        .catch(err => {
          setIsLoading(false);
          setIsError(true); 
          console.log(`Error: ${err.message}`); 
        });
    }

    async function getCategories() {

      setIsLoading(true); 
      
      fetch('https://djevelyn.helioho.st/menu/categories')
      .then(response => 
      {
        setIsLoading(false);

        if (response.ok)
          return response.json();
        else
          throw new Error(`HTTP error! status: ${response.status}`);
      })
      .then(data => { setBaseCategories( data.map(item => item.category) ) })
      .catch(err => {
          setIsLoading(false);
          setIsError(true); 
          console.log(`Error: ${err.message}`); 
      });
    }

    // fetch
    useEffect(() => {
      getMenuItems(); 
      getCategories();      
    }, []);


    // Handling category display
    useEffect(() => 
    {
      if (baseCategories.length === 0)
        return; 

      // Favorites handling
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      
      if (favorites === null || favorites === undefined || favorites.length === 0)
        categories = ['all', ...baseCategories];
      else {
        console.log(`Favorites length is ${favorites.length}. Elements are {${favorites}}`)
        categories = ['all', 'favorites', ...baseCategories];
      }

    }, [baseCategories]); 

    function getItemDetails(givenId) {
      for (let i = 0; i < menuList.length; ++i) {
        const currentItem = menuList[i];
        if (currentItem.id === givenId)
          return currentItem; 
      }
      return { };
    }

    const filterItems = () => {
      switch(category) {
        case 'all':
          return menuList;
        case 'favorites':

          const favorites = JSON.parse(localStorage.getItem('favorites'));

          if (favorites === null)
            return menuList;
          else
            return menuList.filter(item => favorites.includes(item.id));

        default:
          return menuList.filter(item => item.category === category);
      }
    };


    // Error rendering
    if (isLoading)
    {
      return (
        <div className='flex justify-center flex-center'> 
        Loading 
        </div>
      )
    }

    if (isError)
    {
      return (
        <div className='flex justify-center items-center'> 
        Unable to connect to server. Refresh page to try again. 
        </div>
      )
    }

    return (
      <MenuCSS>
      <div className="grid-container">
        <div className="menu-container">        
          <h1>
            Menu
          </h1>

        <div style={ {display: 'flex', justifyContent: 'center'} }>
          <div className="categories-container">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 mx-1 rounded-full capitalize transition-all ${
                  category === cat 
                    ? 'bg-teal-700 text-gray-100 font-semibold hover:bg-teal-600' 
                    : 'bg-natural-dark text-gray-600 hover:bg-gray-100' 
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
          
          <div className="menu-items-container">
            {filterItems().map(item => (
              <MenuItem 
                key={item.id} 
                {...item}
                addItem={() => addItem(item.id)}
                removeItem={() => removeItem(item.id)}
                getItemQuantity={quantities[item.id] || 0}
              />
            ))}
          </div>
        </div>

        <div className='cart-container'>
          <Cart 
            menuList={menuList} 
            getItemDetails={getItemDetails} 
            quantities={quantities} 
            removeItem={removeItem} 
          />
        </div>
      </div>
      </MenuCSS>
    );
  };

export default Menu

let categories = []; 


const MenuCSS = styled.div `

h1 {
    font-size: 2em;
    color: #333;
    padding: 5px;
    text-align: center;
    //box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* One column */
  grid-template-rows: 60% 40%; /* Two rows, equal height */
  height: 100vh; /* Full viewport height */

  grid-template-areas:
  'menu'
  'cart'; 
}

.menu-container {
  height: 100%; 
  overflow-y: auto;
  padding: calc(var(--spacing) * 6);
  
  background-color: #eff3f1;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  grid-area: menu;
}

.categories-container {
  display: flex;
  overflow-x: auto; 
  justify-content: flex-start; 
  margin-top: 2rem;
  margin-bottom: 2rem; 

  background-color: #FAF9F6;
  border-radius: 20px;
}

.menu-items-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: calc(var(--spacing) * 4);
}

.cart-container {
  padding: calc(var(--spacing) * 4);

  grid-area: cart; 
}

@media (min-width: 768px) { /* 768px is the default md breakpoint in Tailwind */
  .grid-container {
    grid-template-columns: 75% 25%; 
    grid-template-rows: 1fr; /* One row */

    grid-template-areas: 'menu cart';
  }

  .menu-items-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .categories-container {
    overflow-x: hidden; 
  }
}

`



/* List to get if you cannot connect to online database */
function getOfflineList()
{
       /*
    async function getMenuItems() {
      // Simulating API fetch with sample data
      const sampleData = [
        { id: '1', name: 'Organic Quinoa Bowl', price: 12.99, description: 'Fresh quinoa with seasonal vegetables and our signature dressing', category: 'mains', image: 'https://source.unsplash.com/random/300x200/?quinoa' },
        { id: '2', name: 'Plant-Based Burger', price: 14.50, description: 'Lab-crafted plant protein with modern cooking techniques', category: 'vegetarian', image: 'https://source.unsplash.com/random/300x200/?veggie-burger' },
        { id: '3', name: 'Molecular Dessert', price: 10.99, description: 'Sweet garden berries transformed with molecular gastronomy', category: 'dessert', image: 'https://source.unsplash.com/random/300x200/?molecular-dessert' },
        { id: '4', name: 'Fermented Tea Kombucha', price: 5.99, description: 'Ancient fermentation meets modern flavor profiles', category: 'drinks', image: 'https://source.unsplash.com/random/300x200/?kombucha' },
      ];
      setMenuList(sampleData);
    }
    */

}


/* Notes 

[1] (Dylan) -- useState -- 

The idea behind reactive programming is that a variable can represent the end of a chain of logic.

Think about an Excel spreadsheet. You might set the values of some cells i.e. A2 = 10.
Other cells are defined with a function A3 = A1 + A2.
Changes to A1 or A2 update the value of A3 without having to manually update that variable.

Setting a useState variable is kind of the same logic.
We can define a variable - like 'menuList'.
If we use the 'setMenuList' function to change that variable it it updated !everywhere it is used! .

We use the menuList variable in the return statement - menuList.map(...).
If menu list is changed this method is recalculated - and the display will update. 
This is instead of us changing menuList, then manually running methods everywhere it is used. 

A useState variable is like a constant variable. 
You don't get a duplicate, you get a reference to the original.



[2] (Dylan) -- Mapping --

A mapping function is being performed with menuList

menuList is retrieved from 'https://djevelyn.helioho.st/menu/...'. 
It is received as as list of Javascript objects, like so:

[ {id:1, name:'Burger', description:'A cheese burger'} , {id:2, name:'Pasta', description:'Spaghetti Bolognese'} ...]

The map function for a list goes through each [element] of the list, performs a [function] on it, and 
returns a list of the results.

An example mapping could be:

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const listSquared = list.map(element => element * element); // using an arrow function*
listSquared would then be [1, 4, 9, 16 ...(etc.)]

* This is the shortned syntax for an arrow function. If you're not doing a statement across
multiple lines you can just do 'i => i * 2', which means the same thing as (i) => { return i * 2 }

A mapped list would have the same number of elements as the original list. 

So what we're doing here is taking JSON objects - {id:1, name:'Burger', description:'A cheese burger'}
And mapping them to <MenuItem> components.
These <MenuItem> components are customized by the props being passed.

The way you would do this is:

menuList.map(object => <MenuItem id={object.id} name={object.name} ../>)

but there is a shorthand - 'unpacking' the elements of object by using ...object
*/