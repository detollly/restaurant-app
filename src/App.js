import MyRoutes from './components/routing/MyRoutes';
import MenuItem from "./components/MenuItem";
import './output.css';

function App() {
  return (
    <div>
      <MyRoutes />
      <div className="bg-background text-primary p-4">
      <h1 className="text-secondary">Hello, Tailwind!</h1>
      <p className="text-primary">This is a paragraph with custom colors.</p>
    </div>
      </div>
  );
}
export default App;