import { useEffect, useState } from 'react';
import { 
    Slider,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    slider: {
        width: 300,
        margin: 'auto'
    },
});

type Props = {
    maxSum: number;
    maxLength: number;
}

export function Calculator({ maxSum, maxLength }: Props) {
    const classes = useStyles();

    const [ length, setLength ] = useState(maxSum / 5);
    const [ width, setWidth ] = useState(maxSum / 5);
    const [ height, setHeight ] = useState(maxSum / 5);

    useEffect(() => {
        setLength(maxSum / 5);
        setWidth(maxSum / 5);
        setHeight(maxSum / 5);
    }, [ maxSum ]);

    function handleLengthChange (e: React.ChangeEvent<Record<string, never>>, newValue: number | number[]) {
        const newLength = newValue as number;

        setLength(newLength);
        setWidth(Math.floor((maxSum - newLength) / 4));
        setHeight(Math.floor((maxSum - newLength) / 4));

        if(newLength <= width || newLength <= height) {
            setLength(Math.floor(maxSum / 5));
            setWidth(Math.floor(maxSum / 5));
            setHeight(Math.floor(maxSum / 5));
        }
    }

    function handleWidthChange (e: React.ChangeEvent<Record<string, never>>, newValue: number | number[]) {
        const newWidth = newValue as number;
        const newHeight = Math.floor((maxSum - length - (newWidth * 2)) / 2);

        setWidth(newWidth);
        setHeight(newHeight);

        if(newHeight <= 1 || width - newWidth <= -2) {
            setHeight(1);
            setWidth(Math.floor(maxSum - length - 2) / 2); 
        }   
    }

    return (
        <div className="app">
            <div className={classes.slider}>
                <span>length: {length ? length : 0}</span>
                <Slider
                    value={length}
                    step={1}
                    marks
                    min={1}
                    max={maxLength * 1}
                    onChange={handleLengthChange}
                />
            </div>
            <div className={classes.slider}>
                <span>width: {width ? width : 0}</span>
                <Slider
                    value={width}
                    step={1}
                    marks
                    min={1}
                    max={length}
                    onChange={handleWidthChange}
                />
            </div>
            <span>height: {height ? height : 0}</span>
        </div>
    );
}

export default Calculator;
