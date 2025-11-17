import axios from "axios";

class UserService {
    static async getData() {
        return await axios.get("http://localhost:3001/users")
    }

    static async validateUser(email: string, password?: string) {
        try {
            const res = await axios.get("http://localhost:3001/users", {params: {username: email, password: password}});
            return res.data?.[0] || undefined;
        } catch (err) {
            return console.log(err);
        }
    }
    static async addUser(user:any) {
        const newUser = { ...user, username: user.email };
        delete newUser.email;
        return await axios.post("http://localhost:3001/users",newUser)
    }
    static async getTransactions(userID:any) {
        const dataa = await axios.get(`http://localhost:3001/transactions`)
        return dataa.data.filter( (item:{userId :any}) => item.userId.toString() == userID)
    }
}
export default UserService;