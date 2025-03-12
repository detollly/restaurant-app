Project: BioMorph Restaurant Booking App

Description:

BioMorph is a React-based web application that allows users to make restaurant reservations online. It provides a seamless user experience for selecting dates, times, party sizes, and submitting personal details. The app also handles special requests, catering inquiries, waitlist management, form validation, and provides a visually appealing interface.

Core Features:

1.  Front Page:
    *   Welcome Message: A welcoming message to greet users.
    *   Navigation: Links to different sections of the app (Menu, Order, Table Booking).
    *   Featured Items: Display of featured menu items or promotions.

2.  Menu:
    *   Categories: Menu items are categorized (e.g., Starters, Main Courses, Desserts, Beverages).
    *   Item Details: Each menu item includes a description, price, and an image.
    *   Filtering: Users can filter items based on dietary preferences (e.g., vegetarian, vegan, gluten-free).

3.  Order Section:
    *   Add to Cart: Users can add menu items to their cart.
    *   Cart Management: Users can view, update, and remove items from their cart.
    *   Checkout: Users can proceed to checkout, providing delivery details and payment information.
    *   Order Confirmation: Users receive a confirmation message upon successful order submission.

4.  Table Booking:
    *   Booking Form:
        *   Date and Time Selection: Users can choose a date and time for their reservation.
            *   The app distinguishes between weekdays and weekends, providing different time slot options for each.
            *   Time slots are dynamically updated based on the selected date and table availability.
        *   Party Size: Users specify the number of guests.
            *   The app calculates the required number of tables (assuming 4 guests per table).
        *   Personal Information: Users provide their name, email, and phone number.
        *   Special Requests: A text area for any dietary restrictions, seating preferences, or other special needs.
        *   Catering Inquiry: Users can indicate interest in off-site catering for private events.
        *   Terms and Conditions: Users must accept the terms and conditions before submitting.
        *   Waitlist: If no tables are available, users can join a waitlist.
    *   Form Validation:
        *   All form fields are validated before submission.
        *   Specific validation includes:
            *   Date and Time: Selection required.
            *   Name: Must not be empty.
            *   Email: Must be a valid email format.
            *   UK Mobile Number: Must match a valid UK mobile number pattern (e.g., 07123 456 789 or +44 7123 456 789).
            *   Terms and Conditions: Acceptance required.
    *   Table Availability:
        *   Mock data (`mockTableData`) simulates table availability for specific dates and times.
        *   The app checks if enough tables are available for the user's party size and requested time.
        *   Users are informed if no tables are available.
    *   Booking Submission and Confirmation:
        *   The app simulates an API call upon form submission.
        *   A confirmation or waitlist message is displayed upon successful submission.
        *   A booking confirmation modal is displayed, with user entered details.
    *   Waitlist System:
        *   Users can join a waitlist if no tables are available at their desired time.
        *   Users on the waitlist will be contacted by text if a table becomes available.
    *   Reset and Navigation:
        *   Users can reset the form to its initial state.
        *   After a booking or waitlist confirmation, users can make another reservation or return to the home page.
    *   Responsive Design:
        *   The app's UI adapts seamlessly to different screen sizes.
    *   Styling:
        *   `styled-components` and Tailwind CSS are used for styling, creating a visually appealing and consistent design.

5.  API for Access to Database:
    *   Backend Integration: The app connects to a backend API for handling reservations, orders, and menu items in a database.
    *   Endpoints:
        *   `/api/menu`: Fetches the menu items.
        *   `/api/order`: Handles order submissions.
        *   `/api/booking`: Handles table booking submissions.
        *   `/api/waitlist`: Manages the waitlist for table bookings.
    *   Database: The backend uses a database (e.g., MongoDB, PostgreSQL) to store and manage data.
    *   Authentication: Secure endpoints with user authentication (e.g., JWT tokens) for managing reservations and orders.

Technical Details:

*   **React:** The app is built using React, a JavaScript library for building user interfaces.
*   **React Router:** `react-router-dom` is employed for client-side routing, allowing navigation between different views within the single-page application.
    *   The `MyRoutes` component (defined in `src/components/routing/MyRoutes.js`) is responsible for setting up the routing.
    *   The `App.js` component renders the `MyRoutes` to utilize these routes.
*   **State Management:** `useState` and `useEffect` hooks manage component state and side effects.
*   **Styling:**
    *   `styled-components`: Used for component-level styling, offering a way to write CSS-in-JS.
    *   Tailwind CSS: A utility-first CSS framework for rapid UI development.
    *   `GlobalStyle`: A styled-component (defined in `src/GlobalStyle.js`) is used for global styles, ensuring consistent typography, colors, and overall look and feel.
    *   The `GlobalStyle` is also imported and used in `App.js` to apply these styles to the entire app.
*   **Mock Data:** `mockTableData` simulates table availability.
*   **Date and Time Handling:** `Date` objects and helper functions manage date and time operations.
*   **Error Handling:** Form validation and error messages are used to provide user feedback.
*   **Helper Functions:**
    *   `getDayOfWeek`: Determines if it is a weekend or weekday.
    *   `generateTimeSlots`: Generates time slots based on weekday or weekend.
    *   `calculateTablesNeeded`: Determines the number of tables needed based on the group size.
    *   `areTablesAvailable`: Checks if enough tables are available.
*   **App.js:**
    *   The `App.js` file is the root component of the application.
    *   It imports and renders the `GlobalStyle` and `MyRoutes` components.
    *   The app is wrapped in a div.
    *   `GlobalStyle` applies global styles to the entire app.
    *   `MyRoutes` component sets up the routing for the application.
*   **Routing:**
    *   The `MyRoutes` component is responsible for defining the routes within the application. It is rendered by the `App.js` component.
    *   It likely uses `BrowserRouter`, `Routes`, and `Route` components from `react-router-dom` to define the different paths and the components that should be rendered for each path.
    *   This configuration enables navigation between different views in the single-page application.
    *   `BookingPage` is routed in the `MyRoutes` component.

Installation and Running:

1.  This project was bootstrapped with Create React App.
2.  The project uses `npm` as its package manager.
3.  To run the app:
    *   Navigate to the project directory in your terminal.
    *   Install dependencies: `npm install`
    *   Start the development server: `npm start`
    *   Open [http://localhost:3000](http://localhost:3000) in your browser.

Available Scripts (from Create React App):

*   `npm start`: Runs the app in development mode.
*   `npm test`: Launches the test runner.
*   `npm run build`: Builds the app for production into the `build` folder.
*   `npm run eject`: Ejects from the Create React App setup (irreversible).

Dependencies:

*   react
*   react-router-dom
*   styled-components

Further Development:

*   **Backend Integration:** Connect the app to a real backend API for handling reservations and table availability in a database.
*   **SMS Confirmation:** Integrate an SMS service (e.g., Twilio) for sending reservation confirmations and waitlist notifications.
*   **Advanced Waitlist:** Enhance the waitlist functionality to track user preferences and notify users when tables become available.
*   **UI/UX Refinements:** Further polish the user interface and user experience based on user feedback.
*   **Comprehensive Testing:** Expand the testing suite to cover more scenarios.
*   **Database:** Implement a database.
*   **User Login System:** Implement a way for users to log in.
*   **Deployment:** Deploy the app to the web.

Project Structure:

*   `public/`: Contains static assets (e.g., `index.html`).
*   `src/`: Contains the React application code.
    *   `components/`: Reusable React components.
        *   `routing/`: Components for the routing.
            *   `MyRoutes`: Component for routing.
    *   `pages/`: React components used as pages.
        *   `BookingPage.jsx`: The main booking form.
    *   `App.js`: The main application component.
    *   `index.js`: Entry point of the React app.
    *   `GlobalStyle.js`: Global style component.
*   `package.json`: Lists dependencies and scripts.
*   `README.md`: (The original Create React App default file)

Collaborative Development:

This project is a collaborative development effort as part of a Software Engineering course. It was developed by a team of six members working together via GitHub. The team members contributed to different aspects of the project, including frontend development, backend integration, UI/UX design, and testing. The use of GitHub facilitated version control, code reviews, and seamless collaboration among the team members.

Contact:

Please contact the creators for any questions about this project.

License:

This project is licensed under the Creative Commons License