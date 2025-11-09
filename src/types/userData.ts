import Transaction from "./transaction";

interface UserData {
  id: number;
  name: string;
  email: string;
  wallets: {
    name: string;
    balance: number;
  }[];
  transactions: Transaction[];
}
export default UserData;