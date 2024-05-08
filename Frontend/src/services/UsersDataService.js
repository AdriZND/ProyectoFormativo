import http from '../config/http-common'
import getUuidByString from 'uuid-by-string'


class UsersDataService {
    //Funcion para crear al user en BDD
    create(user){
        const body = {
            name: user.name,
            surnames: user.surnames,
            username: user.username,
            email: user.email,
            role: user.selectRole === "Student" ? '1' : '2',
            password: user.password,
            token: user.token
    
        }

        return http.post('/user', body)
    }

    //Función para cambiar la contraseña al user en bdd
    changePassword(user, route){
        const body = {     
            password: user.password  
        }
        return http.put('/forgetpassword/changepassword/'+route, body)
    }
    
    //Función para validar el email del usuario y cambiar el estado de la cuenta a
    //activo
    validateEmail(route){
        const body = {
            active: true
        }

        return http.put('/user/username/'+route, body)
    }

    //Funcion para que el user pueda cambiar la contraseña a traves del email
    forgetPassword(user){
        const body = {
            email: user.email
        }

       return http.post('/forgetpassword', body)
    }

    //FindOneByID
    findOneById(id_user){
        return http.get(`/user/id?id=${id_user}`)
    }

    //FindUserRelations
    findUserRelations(id_user){
        return http.get(`/user/relations/id?id=${id_user}`)
    }

    findUserSubject(id_subject){
        return http.get(`/user/subjects/id?id=${id_subject}`)
    }

    deleteUser(id){
        return http.delete(`/user/username/id?id=${id}`)
    }
    deleteUserRelation(id_relation){
        return http.delete(`/user/relations/id?id=${id_relation}`)
    }
    //Login
    login(user) {
        const body = {
            username: user.username,
            password_token: getUuidByString(user.password)
        }

        return http.post('/login', body)
    }

    //Logout
    logout(){
        const session = JSON.parse(localStorage.getItem('session'))
        const body = {
            id_user: session.id_user
        }
        return http.post("/logout", body)
    }




}

export default new UsersDataService()