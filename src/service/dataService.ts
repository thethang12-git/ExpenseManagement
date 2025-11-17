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
        return await axios.get(`http://localhost:3001/transactions/`, {params: {userId: userID}});
    }
    static async getTransactionsByDate(userID:any,date:string){
        return await axios.get("http://localhost:3001/transactions", {params: { userId:userID, date:date }})
    }
    static async getTransactionsByMonth(userID:any,month:any,year:any){
        return await axios.get("http://localhost:3001/transactions", {params: { userId:userID, startDate: `${year}-${month}-01`, endDate: `${year}-${month}-30` }})
    }
}
export default UserService;