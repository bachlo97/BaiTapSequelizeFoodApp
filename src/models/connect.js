import {Sequelize} from "sequelize"
import config from "../config/config.js"

const sequelize = new Sequelize(
    config.db_database,
    config.db_user,
    config.db_password,
    {
        host: config.db_host,
        port:config.db_port,
        dialect:config.db_dialect,
    }
)

//check connect
try{
    await sequelize.authenticate();
    console.log("Kết nối thành công")
}catch(err){
    console.log(err)
}
export default sequelize