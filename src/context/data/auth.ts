import User from "../../models/user";

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  user: User | null;
  handleInfoUser: (user: User) => void;
};

export default AuthContextData;
