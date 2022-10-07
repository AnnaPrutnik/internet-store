import React from 'react';

interface IUserItem {
  email: string;
}

const UserItem = ({ email }: IUserItem) => {
  return <li>{email}</li>;
};

export default UserItem;
