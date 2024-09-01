
// working with objects
 export interface Duck{
    name: string ;
    numLegs: number;
    makeSound: (sound:string) => void;
}
const duck1 : Duck= { // at this level duck1 is created but never used, we should use it, thus we export it into the ducks array. 
    name: 'huey' ,
    numLegs: 2,
    makeSound: (sound: string )=> console.log(sound), //we created this method sound should be string 

}


const duck2 : Duck={
    name:'duey',
    numLegs: 2,
    makeSound: (sound: string )=> console.log(sound),

}
export const ducks = [duck1,duck2] // duck1 and duck2 are considered differnt objects, then the objects created are been used somwhere
duck1.makeSound('quack');
duck2.makeSound('quack');