import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync, selectUsers, selectStatus } from '../features/users/usersSlice';
import UserCard from './UserCard';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({ country: '', gender: '' });
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (users.length) {
      const uniqueCountries = [...new Set(users.map(user => user.address.state))];
      const uniqueGenders = [...new Set(users.map(user => user.gender))];
      setCountries(uniqueCountries);
      setGenders(uniqueGenders);
    }
  }, [users]);

  useEffect(() => {
    let filtered = users;

    if (filters.country) {
      filtered = filtered.filter(user => user.address.state.includes(filters.country));
    }
    
    if (filters.gender) {
      filtered = filtered.filter(user => user.gender === filters.gender);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredUsers(filtered.slice(startIndex, endIndex));
  }, [filters, users, currentPage]);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
    setCurrentPage(1);
  };

  const loadMore = useCallback(() => {
    if ((currentPage * itemsPerPage) < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, users.length]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-end space-x-4 mb-4">
        <select onChange={(e) => handleFilterChange('country', e.target.value)} className="border p-2">
          <option value="">Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select onChange={(e) => handleFilterChange('gender', e.target.value)} className="border p-2">
          <option value="">Gender</option>
          {genders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Demography
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user, index) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </tbody>
      </table>
      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={handlePrevPage} className="border p-2" disabled={currentPage === 1}>Prev</button>
        <button onClick={loadMore} className="border p-2" disabled={(currentPage * itemsPerPage) >= users.length}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
