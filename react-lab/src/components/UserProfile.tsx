import { User } from "../types/user.types";

type Props = {
  user: User;
};

const UserProfile = ({ user }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-1/2 mx-auto my-4 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-2xl text-center font-bold mb-4">User Profile</h2>
      <h3 className="text-xl font-semibold">User Information</h3>
      <p>Id: {!user.id ? "" : user.id}</p>
      <p>Full Name: {!user.fullname ? "" : user.fullname}</p>
      <p>Age: {!user.age ? "" : user.age}</p>
      <p>Education Level: {!user.education ? "" : user.education}</p>
      <p>Gender: {!user.gender ? "" : user.gender}</p>
      <p>Skills: {!user.skills ? "" : user.skills.join(", ")}</p>
      <p>Bio: {!user.bio ? "" : user.bio}</p>
    </div>
  );
};

export default UserProfile;
