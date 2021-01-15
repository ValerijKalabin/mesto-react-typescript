import React, { FunctionComponent, ReactElement } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ICard from '../interfaces/ICard';
import IUser from '../interfaces/IUser';

type CardProps = {
  element: ICard
  onElementClick(element: ICard): void
  onElementLike(element: ICard): void
  onElementDelete(element: ICard): void
};

const Card: FunctionComponent<CardProps> = ({
  element,
  onElementClick,
  onElementLike,
  onElementDelete
}): ReactElement => {
  const currentUser: IUser = React.useContext<IUser>(CurrentUserContext);
  const isOwn: boolean = element.owner._id === currentUser._id;
  const isLiked: boolean = element.likes.some((user) => user._id === currentUser._id);

  function handleClick(): void {
    onElementClick(element);
  }

  function handleLikeClick(): void {
    onElementLike(element);
  }

  function handleDeleteClick(): void {
    onElementDelete(element);
  }

  return (
    <>
      <img className="element__image" src={element.link} alt={element.name} />
      <div className="element__substrate" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{element.name}</h2>
        <div className="element__like-container">
          <button className={`element__like ${isLiked && 'element__like_active'}`} type="button" onClick={handleLikeClick} />
          <p className="element__like-count">{element.likes.length}</p>
        </div>
      </div>
      <button className={`element__trash ${isOwn && 'element__trash_visible'}`} type="button" onClick={handleDeleteClick} />
    </>
  );
}

export default Card;
