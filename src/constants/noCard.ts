import ICard from "../interfaces/ICard";
import noUser from "./noUser";

const noCard: ICard = {
  _id: '',
  name: '',
  link: '',
  owner: noUser,
  createdAt: '',
  likes: [noUser]
}

export default noCard;
