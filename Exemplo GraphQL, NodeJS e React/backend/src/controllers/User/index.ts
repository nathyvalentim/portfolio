import users from '../../db/users.json'

export default{
    findUserByName(name?: string){
        
        if(!name) return users;

        let result;

        name = name.trim().toLocaleLowerCase();
 
        //verifica se a string possui espaco em branco
        if(/\s/g.test(name)){
            //quebra a string de acordo com o espaco em branco
            let tmp = name.split(/\s/g);
            const regex = new RegExp(`^${tmp[0]}.+${tmp[tmp.length-1]}$`);
            //vai retornar os usuarios que o nome inicie com a primeira string e que termine com a ultima string (regex)
            result = users.filter((user) => (user.name && regex.test(user.name.toLocaleLowerCase())));
        }
        else{
            result = users.filter((user) => (user.name && user.name.toLocaleLowerCase().includes(name ? name : '')));
        }

        
        return result;
    },
    findUserById(_id: string){
        const result = users.filter((user) => (
            user._id && user._id.includes(_id)
        ));
        return result;
    }
}