import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function UserManagement() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <section>
      <h2 className='target'>User Management</h2>
      <Link to="add">
        <button>Add New User</button>
      </Link>
      <Routes>
        <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
        <Route path="add" element={<UserForm setUsers={setUsers} />} />
        <Route path="edit/:index" element={<UserForm users={users} setUsers={setUsers} />} />
      </Routes>
    </section>
  );
}

function UserList({ users, setUsers }) {
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>
              <Link to={`edit/${index}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UserForm({ users = [], setUsers }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const index = window.location.pathname.split('/').pop();
    if (index !== 'add' && users.length > 0) {
      setEditingIndex(index);
      setUsername(users[index].username);
      setPassword(users[index].password);
    }
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { username, password };
      setUsers(updatedUsers);
    } else {
      setUsers([...users, { username, password }]);
    }
    navigate("/dashboard/users");
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">{editingIndex !== null ? 'Update User' : 'Add User'}</button>
    </form>
  );
}

export default UserManagement;