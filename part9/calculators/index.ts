import express from 'express';
import calculateBmi  from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const params = req.query;
    if(!isNaN(Number(params?.height)) && !isNaN(Number(params?.weight))) {
        res.json({
            height: params.height,
            weight: params.weight,
            bmi: calculateBmi(Number(params.height),Number(params.weight))
        });
    } else {
        res.json({error: "malformatted parameters"});
    }
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target } = req.body;
    if(daily_exercises && target){
        const ar: Array<number> = daily_exercises as Array<number>;

        if(!isNaN(Number(target)) && !ar.find(f => isNaN(f))) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            res.json(calculateExercises(daily_exercises, target));
        } else {
            res.json({error: "malformatted parameters"});
        }
        
    } else {
        res.json({error: "parameters missing"});
    }

   res.send(req.body);

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});