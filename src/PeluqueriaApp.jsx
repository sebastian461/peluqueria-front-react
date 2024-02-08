import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store";

export const PeluqueriaApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
