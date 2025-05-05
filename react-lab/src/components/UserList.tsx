import { User } from "../types/user.types";

type Props = {
  users: User[];
  onShowUser: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

const UserList = ({ users, onShowUser, onDelete, onUpdate }: Props) => {
  const handleShowUser = (id: string) => {
    onShowUser(id);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleEdit = (id: string) => {
    onUpdate(id);
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 mx-auto my-4 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-2xl text-center font-bold mb-4">Users List</h2>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Id</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.fullname}</td>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">
                <div className="flex gap-1">
                  <button
                    onClick={() => handleShowUser(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
