import { useEffect, useState } from 'react'
import './App.css'
import { UsersTable } from './components/UsersTable'
import { type User } from './types'

let initialUsers: User[] = []

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colors, setColors] = useState(true)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string>('')

  const toggleColors = () => setColors(!colors)

  const toggleSortByCountry = () => setSortByCountry(!sortByCountry)

  const removeUser = (id: string) => {
    const newUsers = users.filter((user) => {
      return user.login.uuid !== id
    })
    setUsers(newUsers)
  }

  const reset = () => setUsers(initialUsers)

  useEffect(() => {
    fetch('https://randomuser.me/api?results=50')
      .then((response) => response.json())
      .then((data) => {
        initialUsers = data.results
        setUsers(initialUsers)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  //first filter if needed
  const filteredUsers =
    filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users

  //then sort just the filtered ones
  const sortedUsers = sortByCountry
    ? [...filteredUsers].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    : filteredUsers

  return (
    <>
      <h1>USER FILTERATOR</h1>
      <header>
        <button onClick={toggleColors}>show colors</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'no sort' : 'sort by country'}
        </button>
        <button onClick={reset}>reset</button>
        <input
          type="text"
          onChange={(ev) => setFilterCountry(ev.target.value)}
          placeholder="Filter by country"
        />
      </header>
      <main>
        {users.length > 0 ? (
          <UsersTable
            colors={colors}
            users={sortedUsers}
            removeUser={removeUser}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  )
}

export default App
