import { Duck } from "./demo"

interface Props {
    duck: Duck
}

export default function DuckItem({duck}: Props){ // creating the react function component that displays what ewe want.
return( // as we are using the argumnet props as our parameter in the function, or as we only want the duck property (or element) from the Props interface, we can just type {duck}:Props as an argument for the component function. 
    <div key={duck.name}> 
        <span>{duck.name}</span>  
      <button onClick={()=> duck.makeSound(duck.name + 'quack')}>Make Sound</button></div>
    
)
} // know we built our component functionning. // duck in map(duck=>) refers that we are working with every duck in the array, it is the parameter of type Duck
