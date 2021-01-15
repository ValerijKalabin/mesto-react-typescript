import React, { FormEvent, SyntheticEvent, FunctionComponent, ReactElement, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import errorIcon from '../images/icon-error.svg';
import successIcon from '../images/icon-success.svg';
import * as api from '../utils/Api';
import IUser from '../interfaces/IUser';
import ICard from '../interfaces/ICard';
import noUser from '../constants/noUser';
import noCard from '../constants/noCard';
import IAvatar from '../interfaces/IAvatar';
import IProfile from '../interfaces/IProfile';
import IPlace from '../interfaces/IPlace';

const App: FunctionComponent = (): ReactElement => {
  const [avatarSubmitButtonCaption, setAvatarSubmitButtonCaption] = useState<string>('Сохранить');
  const [profileSubmitButtonCaption, setProfileSubmitButtonCaption] = useState<string>('Сохранить');
  const [placeSubmitButtonCaption, setPlaceSubmitButtonCaption] = useState<string>('Создать');
  const [confirmSubmitButtonCaption, setConfirmSubmitButtonCaption] = useState<string>('Да');
  const [registerButtonCaption, setRegisterButtonCaption] = useState<string>('Зарегистрироваться');
  const [loginButtonCaption, setLoginButtonCaption] = useState<string>('Войти');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState<boolean>(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState<boolean>(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState<boolean>(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState<boolean>(false);
  const [isShowImagePopupOpen, setIsShowImagePopupOpen] = useState<boolean>(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState<boolean>(false);
  const [isSuccessfulRegistration, setRegistrationState] = useState<boolean>(false);
  const [appState, toggleAppState] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser>(noUser);
  const [userEmail, setUserEmail] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<ICard>(noCard);
  const [deletedСard, setDeletedСard] = useState<ICard>(noCard);
  const [cards, setCards] = useState<ICard[]>([noCard]);
  const history = useHistory();

  function handleSubmitRegisterForm(email: string, password: string): void {
    setRegisterButtonCaption('Регистрация...');
    api.register(email, password)
      .then(() => {
        setRegistrationState(true);
        history.push('/sign-in');
      })
      .catch(() => {
        setRegistrationState(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
        setRegisterButtonCaption('Зарегистрироваться');
      });
  }

  function handleSubmitLoginForm(email: string, password: string): void {
    setLoginButtonCaption('Авторизация...');
    api.getToken(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('mesto-web-token', data.token);
          toggleAppState(!appState);
        }
      })
      .catch((error) => {
        alert(`Ошибка авторизации: ${error.status}`);
      })
      .finally(() => {
        setLoginButtonCaption('Войти');
      });
  }

  function handleClickLogoutButton(): void {
    localStorage.removeItem('mesto-web-token');
    setUserEmail('');
    setCurrentUser(noUser);
    setCards([noCard]);
    history.push('/sign-in');
  }

  function handleEditAvatarClick(): void {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(): void {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(): void {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardShowClick(element: ICard): void {
    setSelectedCard(element);
    setIsShowImagePopupOpen(true);
  }

  function handleCardDeleteClick(element:ICard): void {
    setDeletedСard(element);
    setIsConfirmDeletePopupOpen(true);
  }

  function closeAllPopups(event: SyntheticEvent): void {
    if(event.target === event.currentTarget) {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsConfirmDeletePopupOpen(false);
      setIsShowImagePopupOpen(false);
      setIsInfoTooltipPopupOpen(false);
    }
  }

  function handleUpdateAvatar(avatar: IAvatar): void {
    setAvatarSubmitButtonCaption('Сохранение...');
    api.updateAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsEditAvatarPopupOpen(false);
      })
      .catch ((error) => {
        alert(`Ошибка записи данных пользователя ${error.status}`);
      })
      .finally(() => {
        setAvatarSubmitButtonCaption('Сохранить');
      });
  }

  function handleUpdateUser(profile: IProfile): void {
    setProfileSubmitButtonCaption('Сохранение...');
    api.updateProfile(profile)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(false);
      })
      .catch ((error) => {
        alert(`Ошибка записи данных пользователя ${error.status}`);
      })
      .finally(() => {
        setProfileSubmitButtonCaption('Сохранить');
      });
  }

  function handleAddPlace(place: IPlace): void {
    setPlaceSubmitButtonCaption('Сохранение...');
    api.createCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch ((error) => {
        alert(`Ошибка записи данных нового места ${error.status}`)
      })
      .finally(() => {
        setPlaceSubmitButtonCaption('Создать');
      });
  }

  function handleCardLike(element: ICard): void {
    const isLiked: boolean = element.likes.some((user) => user._id === currentUser._id);
    api.toggleLike(element._id, isLiked)
      .then((editedCard) => {
        const newCards: ICard[] = cards.map(card => card._id === editedCard._id ? editedCard : card);
        setCards(newCards);
      })
      .catch(() => {
        alert('Не удалось изменить лайк. Попробуйте ещё раз.');
      });
  }

  function handleCardDelete(event: FormEvent): void {
    event.preventDefault();
    setConfirmSubmitButtonCaption('Удаление...');
    api.deleteCard(deletedСard._id)
      .then(() => {
        const newCards: ICard[] = cards.filter(card => card._id !== deletedСard._id);
        setCards(newCards);
        setIsConfirmDeletePopupOpen(false);
      })
      .catch((error) => {
        alert(`Ошибка при удалении карточки на сервере: ${error.status}`)
      })
      .finally(() => {
        setConfirmSubmitButtonCaption('Да');
      });
  }

  React.useEffect(() => {
    const localToken: string | null = localStorage.getItem('mesto-web-token');
    if(localToken) {
      setLoginButtonCaption('Авторизация...');
      Promise.all([
        api.checkToken(localToken),
        api.getUser(),
        api.getCards()
      ])
        .then(([email, user, cards]) => {
          setUserEmail(email.data.email)
          setCurrentUser(user);
          setCards(cards);
          history.push('/');
        })
        .catch((error) => {
          alert(`Ошибка авторизации: ${error.status}`);
        })
        .finally(() => {
          setLoginButtonCaption('Войти');
        });
    }
  }, [appState, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            userEmail={userEmail}
            onClickLogoutButton={handleClickLogoutButton}
          />
          <Switch>
            <Route path="/sign-up">
            <Register
              registerButtonCaption={registerButtonCaption}
              onSubmitRegisterForm={handleSubmitRegisterForm}
            />
            </Route>
            <Route path="/sign-in">
              <Login
                loginButtonCaption={loginButtonCaption}
                onSubmitLoginForm={handleSubmitLoginForm}
              />
            </Route>
            <Route path="/">
              { !!userEmail
                ? <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardShowClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                    cards={cards}
                  /> 
                : <Redirect to="./sign-in" />
              }
            </Route>
          </Switch>
          <Footer />
          <ImagePopup
            card={selectedCard}
            isOpen={isShowImagePopupOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            submitButtonCaption={avatarSubmitButtonCaption}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            submitButtonCaption={profileSubmitButtonCaption}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            submitButtonCaption={placeSubmitButtonCaption}
          />
          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            isDisabledSubmitButton={false}
            submitButtonCaption={confirmSubmitButtonCaption}
          >
            <div />
          </PopupWithForm>
          <InfoTooltip
            name="info"
            icon={isSuccessfulRegistration ? successIcon : errorIcon}
            title={isSuccessfulRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
