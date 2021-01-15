import React, { FunctionComponent, ReactElement } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ICard from '../interfaces/ICard';
import Card from './Card';

type MainProps = {
  onEditAvatar(): void
  onEditProfile(): void
  onAddPlace(): void
  onCardClick(element: ICard): void
  onCardLike(element: ICard): void
  onCardDelete(element: ICard): void
  cards: ICard[]
};

const Main: FunctionComponent<MainProps> = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}): ReactElement => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile} />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>
      <section className="elements-container">
        <ul className="elements">
          {cards.map((card) => (
            <li className="element" key={card._id}>
              <Card
                element={card}
                onElementClick={onCardClick}
                onElementLike={onCardLike}
                onElementDelete={onCardDelete}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
