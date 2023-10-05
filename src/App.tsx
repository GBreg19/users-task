import { Provider } from "react-redux";
import UsersTable from "./routes/users-table";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <UsersTable />;
      </Provider>
    </>
  );
}

export default App;
