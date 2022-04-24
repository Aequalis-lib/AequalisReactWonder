import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { ReactQueryDevtools } from "react-query/devtools";
import { PaginatedQueriesPage } from './components/PaginatedQueries'
import { InfiniteScrollPage } from "./components/InfiniteQueries";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link style={{ textDecoration: "none" }} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/super-heroes">
                  Traditional Super Heroes
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/rq-super-heroes">
                  RQ Super Heroes
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/rq-pagination">
                  RQ Pagination
                </Link>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/rq-infinite-query"
                >
                  RQ Infinite Scroll
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/rq-pagination">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-infinite-query">
              <InfiniteScrollPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
