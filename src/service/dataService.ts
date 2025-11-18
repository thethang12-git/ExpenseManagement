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
    static async getCategories(userID:any){
        return await axios.get("http://localhost:3001/categories", {params: { userId:userID }})
    }
    static async addCategory(category:any){
        return await axios.post("http://localhost:3001/categories", category)
    }
    static async updateCategory(categoryId:any, category:any){
        return await axios.put(`http://localhost:3001/categories/${categoryId}`, category)
    }
    static async deleteCategory(categoryId:any){
        return await axios.delete(`http://localhost:3001/categories/${categoryId}`)
    }
}
export default UserService;