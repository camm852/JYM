import { QueryClient, QueryClientProvider } from 'react-query';
import RouteApp from './routes/RouteApp';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteApp />
    </QueryClientProvider>
  );
}

export default App;
