import React , {useEffect, useState} from "react";
import styled from 'styled-components';
import MenuItem from "./MenuItem";
import Cart from "./Cart";


const Menu = () => {
    const [menuList, setMenuList] = useState([]);
    const [category, setCategory] = useState('all');
    const [quantities, setQuantities] = useState({});

    async function getMenuItems() {
        fetch('https://djevelyn.helioho.st/menu/items/all?key=123')
        .then(response => response.json())
        .then(data => { setMenuList(data) });
    }

    useEffect(() => {
      getMenuItems(); 
    }, []);

    function getItemDetails(givenId) {
      for (let i = 0; i < menuList.length; ++i) {
        const currentItem = menuList[i];
        if (currentItem.id === givenId)
          return currentItem; 
      }
      return { };
    }

    const addItem = (id) => {
      setQuantities(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
      }));
    };

    const removeItem = (id) => {
      setQuantities(prev => {
        if ((prev[id] || 0) <= 0) return prev;
        return {
          ...prev,
          [id]: prev[id] - 1
        };
      });
    };

    const filterItems = () => {
      return category === 'all' ? menuList : menuList.filter(item => item.category === category);
    };

    return (
      <div className="grid grid-cols-4 h-screen mb-20">
        <div className="col-span-3 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center text-natural-dark mb-8">
            <i className="mdi mdi-leaf-maple mr-2"></i>
            Menu
            <i className="mdi mdi-atom ml-2"></i>
          </h1>

          <div className="flex justify-center mb-8">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 mx-1 rounded-full capitalize transition-all ${
                  category === cat 
                    ? 'bg-natural-dark font-semibold text-green-300' 
                    : 'bg-white text-gray-600 hover:bg-natural-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="col-span-1 bg-gray-50 p-4">
          <Cart 
            menuList={menuList} 
            getItemDetails={getItemDetails} 
            quantities={quantities} 
            removeItem={removeItem} 
          />
        </div>
      </div>
    );
  };

export default Menu


const categories = ['all', 'mains', 'vegetarian', 'sides', 'drinks', 'dessert'];


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