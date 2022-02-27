interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
/*
interface Args {
    arg1: Array<number>;
    arg2: number;
}

const parseArguments2 = (args: Array<string>): Args => {
    if (args.length < 4) throw new Error("not enough arguments");
    if (args.slice(2).find(f => isNaN(Number(f)))) throw new Error("Arguments must numbers!");
    
    return {
        arg1: args.slice(3).map(f => Number(f)),
        arg2: Number(args[2])
    };
};
*/
export const calculateExercises = (args: Array<number>, target: number): ExerciseResults => {

    const periodLength: number = args.length;
    const average: number = args.reduce((prev,cur) => prev + cur) / periodLength;
    const trainingDays: number = args.filter(f => f>0).length;
    const success: boolean = average >= target;
    let rating = 1;
    let ratingDescription = "bad";
    const diff: number = target - average;
    if (diff <= 0) {
        rating = 3;
        ratingDescription = "good";
    } else if (diff < 0.3) {
        rating = 2;
        ratingDescription = "ok, but you could do better";
    } 
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

/*
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 1.5, 0, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 2], 2));
*/
/*
try {
    const {arg1, arg2 } = parseArguments2(process.argv);
    console.log(calculateExercises(arg1, arg2));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
*/