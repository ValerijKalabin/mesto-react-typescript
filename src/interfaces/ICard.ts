import IUser from "./IUser";

interface ICard {
  _id: string
  name: string
  link: string
  owner: IUser
  createdAt: string
  likes: IUser[]
};
  
export default ICard;
