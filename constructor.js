class User{
    constructor(name, surname, books, pets){
        this.name = name
        this.surname = surname
        this.books = books
        this.pets = pets
    }

    getFullName(){
        return (`${this.name} ${this.surname}`)
    }

    addPet(pet){
        this.pets.push(pet)
    }

    countPets(){
        return this.pets.lenght
    }

    addBook(Name, Autor){
        this.books.push({name:Name, autor:Autor})
    }

    getBookNames(){
        return this.books.map(book => book.name)
    }
}

const user = new User('Richard', 'Moore', [{Name:'Cien años de soledad', Autor:'Gabriel García Márquez'}, {Name:'Orgullo y prejucio', Autor:'Jane Austen'}, ['perro', 'gato']]);

console.log('Nombre de Usuario: ', user.getFullName())
user.addPet('loro')
console.log('Cantadidad de mascotas: ', user.countPets)
user.addBook('Crimen y castigo', 'Fiódor Dostoyevski')
console.log('Nombre de libros: ', user.getBookNames())
