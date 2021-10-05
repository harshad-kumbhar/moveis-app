import React from 'react';

const UserContext = React.createContext({name: 'Harshad'});
UserContext.displayName = 'UserContext';

export default UserContext;