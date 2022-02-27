/*
Underweight (Severe thinness)	< 16.0
Underweight (Moderate thinness)	16.0 – 16.9
Underweight (Mild thinness)	17.0 – 18.4
Normal range	18.5 – 24.9
Overweight (Pre-obese)	25.0 – 29.9
Obese (Class I)	30.0 – 34.9
Obese (Class II)	35.0 – 39.9
Obese (Class III)	≥ 40.0
*/
/*
interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error("not enough arguments");
    if (args.length > 4) throw new Error("too many arguments");

    if( !isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const height: number = Number(args[2]);
        if (height < 50) throw new Error("height should be given in centimeters and min height is 50 cm")
        return {
            height,
            weight: Number(args[3])
        }
    } else {
        throw new Error("provided arguments were not numbers!");
    }

}
*/

const calculateBmi = (height: number, weight: number): string => {
    const h: number = (height * height) / 10000;
    const bmi: number = weight / h;
    if (bmi < 16.0) {
        return "Underweight (severe thinness)";
    } else if(bmi <= 16.9){
        return "Underweight (Moderate thinness)";
    } else if (bmi <= 18.4) {
        return "Underweight (Mild thinness)";
    } else if(bmi > 24.9 && bmi <=29.9) {
        return "Overweight (Pre-obese)";
    } else if(bmi > 29.9 && bmi <= 34.9) {
        return "Obese (Class I)";
    } else if(bmi > 34.9 && bmi <=39.9) {
        return "Obese (Class II)";
    } else if(bmi > 39.9) { 
        return "Obese (Class III)";
    } else {
        return "Normal (healthy weight)";
    }
};
/*
console.log(calculateBmi(180,74));
console.log(calculateBmi(180,50));
console.log(calculateBmi(180,54));
console.log(calculateBmi(180,59));
console.log(calculateBmi(180,110));
console.log(calculateBmi(180,120));
console.log(calculateBmi(180,130));
*/
/*
try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
*/


export default calculateBmi;