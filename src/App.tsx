import AppRoutes from "./AppRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <>
            <AppRoutes />
            <ToastContainer theme="dark" position="bottom-right"/>
        </>
    );
};

export default App;