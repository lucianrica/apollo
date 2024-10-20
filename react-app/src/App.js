import { useQuery, gql } from '@apollo/client'
import './App.css'

function App() {

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return data.evaluations.map(({ id, inserted_date, payload }) => (
    <div key={id}>
      <h1>{id}</h1>
      <h3>{inserted_date}</h3>
      <h3>{payload.a }</h3>
      <br />
    </div>
  ))
}

export default App;

const GET_LOCATIONS = gql`
  query evaluations($page: Int!=1) {
    evaluations(page: $page) {
      id
      inserted_date
      payload
      request {
        inserted_date
        payload
      }
    }
  }
`
