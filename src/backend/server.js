
import FauxExpress from './FauxExpress.js'; 
import getDatabase from './database.js';

const app = new FauxExpress();
const port = 3000;


let db = undefined; 

window.initSqlJs().then(SQL => {
    
    // Decode Base64 and convert to Uint8Array
    const binaryString = atob(getDatabase()); // Decode Base64 string
    const binaryArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
    }

    db = new SQL.Database(binaryArray);

    db.run(`CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, category TEXT, image TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS restaurant_feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT, customer_email TEXT, rating INTEGER, comments TEXT, visit_date TEXT, submission_date DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    console.log("Database initialized!"); 
})


// MENU 

app.get('/menu/items/all', async (req, res) => { 
    
    const stmt = db.prepare("SELECT * FROM menu_items");

    let rows = []

    while (stmt.step())
    {
        const row = stmt.getAsObject();
        rows.push(row); 
    }

    res.send(rows);
});

app.get('/menu/id/:idNumber', (req, res) => { 
    const { idNumber } = req.params;

    const stmt = db.prepare('SELECT * FROM menu_items WHERE id = $id');
    const row = stmt.getAsObject({$id : idNumber});

    res.send(row); 

});


app.get('/menu/items/:category', (req, res) => { 
    
    const { category } = req.params;

    const stmt = db.prepare("SELECT * FROM menu_items WHERE category = $category");

    let rows = []

    stmt.bind({$category : category});

    while (stmt.step())
    {
        const row = stmt.getAsObject();
        rows.push(row); 
    }

    res.send(rows);

});

app.get('/menu/categories', (req, res) => { 

    const stmt = db.prepare('SELECT DISTINCT category FROM menu_items');

    let rows = [];

    while(stmt.step())
    {
        const row = stmt.getAsObject();
        rows.push(row);
    }

    res.send(rows); 

});



// FEEDBACK 

app.get('/menu/feedback/all', (req, res) => { 
    
    const stmt = db.prepare("SELECT * FROM restaurant_feedback ORDER BY submission_date DESC");

    let rows = []

    while (stmt.step())
    {
        const row = stmt.getAsObject();
        rows.push(row); 
    }

    res.send(rows);

});

app.post('/menu/feedback/add', (req, res) => { 
    
    const data = {customer_name: 'John'};

    console.log(`data is ` + data.customer_name); 

    const { customer_name, customer_email, rating, comments, visit_date } = req.body;

    console.log( `Backend feedback submission name is ` + customer_name ); 

    db.run('INSERT INTO restaurant_feedback (customer_name, customer_email, rating, comments, visit_date) VALUES (?, ?, ?, ?, ?)', [customer_name, customer_email, rating, comments, visit_date]);

    res.send({ success: true, message: 'Thank you for your feedback!'});

});

	



// Wait for DB setup
const handleFetch = async (givenURL, req, port) =>
{
    let timeout = 10; // 10 seconds;
    const checkInterval = 200; // 200 milliseconds

    while (db === undefined && timeout > 0) {
        await sleep(checkInterval);
        console.log('Waiting for database...'); 
        timeout -= (checkInterval / 1000); 
    }

    return FauxExpress.fauxFetch(givenURL, req, port); 
}

// https://stackoverflow.com/questions/1447407/whats-the-equivalent-of-javas-thread-sleep-in-javascript
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

app.listen(port, (err) => {
    
    if (err)
        console.log(`Error starting server on port ${port}`)
    else
        console.log(`Server running on port ${port}`);
});


async function fauxFetch(url, req, port) // get as default
{
    return await handleFetch(url, req, port); 
}


export default fauxFetch; 