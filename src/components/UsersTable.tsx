import { type User } from '../types.d';

interface Props {
  removeUser: (id: string) => void;
  colors: boolean;
  users: User[];
}

export function UsersTable({ removeUser, colors, users }: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => {
            const zebra = index % 2 === 0 ? '#333' : '#666';
            const color = colors ? zebra : 'transparent';

            return (
              <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => removeUser(user.login.uuid)}>delete</button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <h2>No users found</h2>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}