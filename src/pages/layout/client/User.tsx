import { useEffect, useState } from "react";
import { getUsers, getUserById } from "../../../api/userApi";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleClick = async (id: number) => {
    const { data } = await getUserById(id);
    setSelectedUser(data);
  };

  return (
    <div className="flex">
      <div className="w-1/2 border-r p-4">
        <h2 className="text-lg font-bold mb-2">Danh sách Users</h2>
        {users.map((user) => (
          <p
            key={user.id}
            onClick={() => handleClick(user.id)}
            className="cursor-pointer hover:text-pink-600"
          >
            {user.name}
          </p>
        ))}
      </div>
      <div className="w-1/2 p-4">
        {selectedUser ? (
          <div>
            <h3 className="text-xl font-bold">{selectedUser.name}</h3>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Website: {selectedUser.website}</p>
          </div>
        ) : (
          <p>Chọn 1 user để xem chi tiết</p>
        )}
      </div>
    </div>
  );
};

export default Users;
