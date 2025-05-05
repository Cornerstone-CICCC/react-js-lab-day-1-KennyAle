import UserForm from "./components/UserForm.tsx";
import UserList from "./components/UserList.tsx";
import UserProfile from "./components/UserProfile.tsx";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { User } from "./types/user.types.ts";

const App = () => {
  const [user, setUser] = useState<User>({
    id: "",
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: "",
  });
  const [users, setUsers] = useState<User[]>([
    {
      id: uuidv4(),
      fullname: "John Doe",
      age: 30,
      education: "college",
      gender: "male",
      skills: ["JavaScript", "React"],
      bio: "A software developer with a passion for learning new technologies.",
    },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (user: Omit<User, "id">) => {
    const newUser = { ...user, id: uuidv4() };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log("User added:", newUser);
  };

  const handleShowUser = (id: string) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      setUser(selectedUser);
      console.log("Selected user:", user);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleEditRequest = (id: string) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      setEditingUser(selectedUser);
    }
  };

  return (
    <div className="flex items-start justify-center gap-2 min-h-screen bg-gray-100">
      <UserForm
        editUser={editingUser}
        onAdd={handleAddUser}
        onUpdate={handleUpdateUser}
      />
      <UserList
        users={users}
        onShowUser={handleShowUser}
        onDelete={handleDeleteUser}
        onUpdate={handleEditRequest}
      />
      <UserProfile user={user} />
    </div>
  );
};

export default App;
