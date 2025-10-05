import Header from './component/Header';
import { Grid } from './component/Grid';
import Legend from './component/Legend';
import ToastNofication from './component/ToastNofication';

/**
 * The main component of the application.
 */
function App ()
{
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <ToastNofication />
      <Header />
      <Grid />
      <Legend />
    </div>
  );
}

export default App;
