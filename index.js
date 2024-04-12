/**
 * @format
 */
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { NotificationProvider } from "./src/context/NotificationContext";
// Định nghĩa một hàm trả về cấu trúc của app
const AppWrapper = () => {
  return (
    <NotificationProvider>
      <App />
    </NotificationProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
