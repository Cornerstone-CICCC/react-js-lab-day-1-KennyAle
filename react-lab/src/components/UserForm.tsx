import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../types/user.types";

type Props = {
  onAdd: (user: Omit<User, "id">) => void;
  onUpdate: (user: User) => void;
  editUser: User | null;
};

const UserForm = ({ onAdd, onUpdate, editUser }: Props) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    fullname: "",
    age: 0,
    education: "level",
    gender: "",
    skills: [],
    bio: "",
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        fullname: editUser.fullname,
        age: editUser.age,
        education: editUser.education,
        gender: editUser.gender,
        skills: editUser.skills,
        bio: editUser.bio,
      });
    } else {
      setFormData({
        fullname: "",
        age: 0,
        education: "level",
        gender: "",
        skills: [],
        bio: "",
      });
    }
  }, [editUser]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prevState) => {
        const newSkills = checked
          ? [...prevState.skills, name]
          : prevState.skills.filter((skill) => skill !== name);
        return {
          ...prevState,
          skills: newSkills,
        };
      });
    } else if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        gender: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      onUpdate({ ...formData, id: editUser.id });
    } else {
      onAdd(formData);
    }
    setFormData({
      fullname: "",
      age: 0,
      education: "level",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  const handleClear = () => {
    setFormData({
      fullname: "",
      age: 0,
      education: "level",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  return (
    <div className="user-form w-1/2 mx-auto my-4 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-2xl font-bold text-center">User Form</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="font-semibold " htmlFor="fullname">
          Your Name:
        </label>
        <input
          value={formData.fullname}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          type="text"
          placeholder="Enter Your Full Name"
          name="fullname"
          autoComplete="off"
        />
        <label className="font-semibold" htmlFor="age">
          Your Age:
        </label>
        <input
          value={formData.age}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          type="number"
          placeholder="Enter Your Age"
          name="age"
          autoComplete="off"
        />
        <select
          value={formData.education}
          onChange={handleChange}
          className="font-semibold ml-[-5px]"
          name="education"
          id="education"
        >
          <option value="level" disabled>
            Select Your Education Level
          </option>
          <option value="grade" id="grade">
            Grade School
          </option>
          <option value="highschool" id="highschool">
            High School
          </option>
          <option value="college" id="college">
            College
          </option>
        </select>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Select Your Gender: </h3>
          <div className="flex gap-2">
            <label htmlFor="male">Male</label>
            <input
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              type="radio"
              name="gender"
              id="male"
            />
            <label htmlFor="female">Female</label>
            <input
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              type="radio"
              name="gender"
              id="female"
            />
            <label htmlFor="other">Other</label>
            <input
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
              type="radio"
              name="gender"
              id="other"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Select Your Skills:</h3>
          <div className="flex gap-2">
            <label htmlFor="typescript">TypeScript</label>
            <input
              checked={formData.skills.includes("typescript")}
              onChange={handleChange}
              type="checkbox"
              name="typescript"
              id="typescript"
            />
            <label htmlFor="react">React</label>
            <input
              checked={formData.skills.includes("react")}
              onChange={handleChange}
              type="checkbox"
              name="react"
              id="react"
            />
            <label htmlFor="nodejs">Node</label>
            <input
              checked={formData.skills.includes("nodejs")}
              onChange={handleChange}
              type="checkbox"
              name="nodejs"
              id="nodejs"
            />
            <label htmlFor="nosql">NoSQL</label>
            <input
              checked={formData.skills.includes("nosql")}
              onChange={handleChange}
              type="checkbox"
              name="nosql"
              id="nosql"
            />
          </div>
        </div>
        <label className="font-semibold" htmlFor="bio">
          Enter Your Message:
        </label>
        <textarea
          value={formData.bio}
          onChange={handleChange}
          name="bio"
          placeholder="Type Your Message Here..."
          className="resize-none"
        ></textarea>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add/Save User
          </button>
          <button
            onClick={handleClear}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
