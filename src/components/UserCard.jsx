import React from 'react';

const UserCard = ({ user }) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap"><img src={user.image} alt={user.firstName} className="w-10 h-10 rounded-full" /></td>
      <td className="px-6 py-4 whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</td>
      <td className="px-6 py-4 whitespace-nowrap">{`${user.gender}/${user.age}`}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.company.title}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.address.state}</td>
    </tr>
  );
};

export default UserCard;
