import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '÷'
}


export const useCalculator = () => {
     const [formula, setFormula] = useState('0')
     const [number, setNumber] = useState('0')
     const [prevNumber, setPevNumber] = useState('0')
     const lastOperation = useRef<Operator>();

     useEffect(()=> {
      if(lastOperation.current){
         const firstFormulePart = formula.split(' ').at(0)
         setFormula(`${firstFormulePart} ${lastOperation.current} ${number}`)
      } else {
         setFormula(number)
      }
     }, [number])

     useEffect(() => {
      const subResult = calculateSubResult()
      setPevNumber(`${subResult}`)
     }, [formula])

     const clean = () => {
      setFormula('0'),
      setNumber('0'),
      setPevNumber('0'),
      lastOperation.current = undefined;
     }

     const deleteLast = () => {
      let currentSign = ''
      let temporalNumber = number

      if(number.includes('-')){
         currentSign = '-'
         temporalNumber = number.substring(1)
      }

      if(temporalNumber.length > 1 ){
         return setNumber(currentSign + temporalNumber.slice(0, -1))
      }

      setNumber('0')
     }
     const toggleSign = () => {
      if(number.includes('-')){
         return setNumber(number.replace('-', ''))
      }
      setNumber('-' + number)
     }

      const setLastNumber = () => {
         calculateResult();
         
         if(number.endsWith('.')){
            setPevNumber(number.slice(0, -1))
         }
         setPevNumber(number)
         setNumber('0')  
      }

      const addOperation = () => {
         setLastNumber()
         lastOperation.current = Operator.add
      }
      const multiplyOperation = () => {
         setLastNumber()
         lastOperation.current = Operator.multiply
      }
      const subtractOperation = () => {
         setLastNumber()
         lastOperation.current = Operator.subtract
      }
      const divideOperation = () => {
         setLastNumber()
         lastOperation.current = Operator.divide
      }

      const calculateSubResult = () => {
         const [firstValue, operation, secondValue] = formula.split(' ')
         const num1 = Number( firstValue)
         const num2 = Number( secondValue)
         if( isNaN(num2)) return num1;

         switch(operation){
            case Operator.add:
               return num1 + num2
            case Operator.subtract:
               return num1 - num2
            case Operator.multiply:
               return num1 * num2
            case Operator.divide:
               return num1 / num2
            default: 
               throw new  Error(`Operation ${operation} not implemented!`)
         }

      }
      const calculateResult = () => {
         const result = calculateSubResult()
         setFormula(`${result}`)
         
         lastOperation.current = undefined;
         setPevNumber('0')
      }

     const buildNumber = (numberString: string) => {
      // Veridicar si existe el numero decimal.
      if(number.includes('.') &&  numberString === '.') return;

      if(number.startsWith('0') || number.startsWith('-0')) {
         if(numberString === '.') {
            return setNumber(number + numberString)
         } 

         if( numberString === '0' && number.includes('.') ) {
            return setNumber(number + numberString)
         } 

         if (numberString != '0' && !number.includes('.')) {
            return setNumber(numberString)
         }

         if(numberString === '0' && !number.includes('.')){
            return;
         }
      }
      setNumber(number + numberString)
   }

     return {
        // Props
        formula, 
        number,
        prevNumber, 

        // Methods
        buildNumber,
        clean,
        toggleSign,
        deleteLast,
        divideOperation,
        addOperation,
        subtractOperation,
        multiplyOperation,
        calculateSubResult,
        calculateResult
     }

}
