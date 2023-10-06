## Technologies used

1. React: The core library for building the user interface.

2. TypeScript: The primary language used for enhanced type checking and code quality.

3. TailwindCSS: Used for styling the application and ensuring a responsive design.

4. Redux Toolkit: Utilized for state management, providing a structured and efficient way to manage application data.

5. JSON Server: Used as a fake API to simulate data fetching and management.

## Starting the JSON Server
## To retrieve data, follow these instructions to start the JSON Server:

1. Open your terminal: Launch your command-line interface or terminal application.

2. Navigate to the Project Directory: Use the cd command to navigate to the directory where your project is located. For example: cd /path/to/your/project

3. Run the JSON Server: Use the following command to initiate the JSON Server, providing the path to your JSON database file (db.json) and specifying the desired port (default is 3000, but here we're using port 8000): 
## json-server --watch db.json --port 8000

4. Server is Running: Once you execute the command, the JSON Server will be up and running. It will display information about the routes and endpoints available for your JSON data.

You can now use this server to fetch data from your db.json file, making it accessible for your application.
