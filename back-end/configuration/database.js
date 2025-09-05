import mongoose from "mongoose";
async function authenticate(){
    try {
       await mongoose.connect('mongodb://localhost:27017/fashionnova24');
       console.log('database is connected..');
    } catch (error) {
        console.error('database disconnected...:',error);
    }
}
export default authenticate;