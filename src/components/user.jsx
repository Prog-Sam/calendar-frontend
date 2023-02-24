import React from 'react';
import { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';
import UserTable from '../common/userTable';
import MenuHeader from '../common/menuHeader';
import _ from 'lodash';

const User = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: 0, value: 'TEMPORARY' },
      { id: 1, value: 'ACTIVE' },
    ],
    access: [
      { id: '0', value: 'DEVELOPER' },
      { id: '1', value: 'OIC' },
      { id: '2', value: 'ASSISTANT OIC' },
      { id: '3', value: 'MANAGEMENT' },
      { id: '4', value: 'OPTOMETRIST' },
      { id: '5', value: 'ENCODER' },
      { id: '6', value: 'SALES' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getUsers();
      setUsers(data);
    }

    getData();
  }, []);

  const handlePageChange = (i) => {
    setCurrentPage(i + 1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = users;
    if (searchQuery)
      filtered = users.filter((u) =>
        `${u.lastName}, ${u.firstName} ${u.middleName}`.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginated = paginate(sorted, currentPage, pageSize);
    return { paginated, filtered };
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
        <MenuHeader
          path='users'
          header={'USERS'}
          buttonLabel='User'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <UserTable
          users={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          totalItems={getPagedData().filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default User;
