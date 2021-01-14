import React from 'react';
import IUser from '../interfaces/IUser';
import noUser from '../constans/noUser';

const CurrentUserContext = React.createContext<IUser>(noUser);

export default CurrentUserContext;
