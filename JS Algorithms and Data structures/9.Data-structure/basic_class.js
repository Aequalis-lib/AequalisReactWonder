class Student{
    constructor(firstName,lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        this.late = 0;
    }
    fullName(){
        return `Your full name is ${this.firstName} ${this.lastName}`;
    }
    markLate(){
        this.late += 1;
        if(this.late >= 3){
            return "You are expelled!!!"
        }
        return `${this.firstName} ${this.lastName} has been late ${this.late} times`;
    }
}

let ts = new Student("Thamarai","Selvan")
