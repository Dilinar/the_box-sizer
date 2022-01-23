import { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20
    },
    drawer: {
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
        padding: `${theme.spacing(2)}px 0`
    },
    form: {
        marginTop: theme.spacing(2),
        display: 'flex'
    },
    input: {
        marginRight: theme.spacing(1)
    }
}));

type Props = {
    show: boolean;
    defaultMaxSum: number;
    defaultMaxLength: number;
    onMaxDimensionsChange: (sum: number, length: number) => void;
};

export function SetupDrawer({ show, defaultMaxSum, defaultMaxLength, onMaxDimensionsChange }: Props) {
    const classes = useStyles();

    const [ maxSum, setMaxSum ] = useState(defaultMaxSum);
    const [ maxLength, setMaxLength ] = useState(defaultMaxLength);

    function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        if (maxSum === NaN || maxLength === NaN) {
            alert ("Value fields can not be left empty")
        }

        onMaxDimensionsChange(maxSum, maxLength);
    }
    console.log(`${maxSum} i ${maxLength} w drawer`);
    
    function onMaxSumChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);

        setMaxSum(Math.max(value, 0));
        setMaxLength(Math.floor(value / 2));
    }
    
    function onMaxLengthChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value, 10);

        if (value > maxSum - 4) {
            alert("The max length can't exceed the max sum - 4");

            return setMaxLength(maxSum - 4);
        }

        setMaxLength(Math.max(value, 0));
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={show}>
                <Drawer variant="persistent" anchor="bottom" open={show} classes={{ paper: classes.drawer }}>
                    <div className={classes.content}>
                        <span>
                            Before you go further, please enter the maximal sum of length and the circumference measured perpendicular to the length and the maximal length allowed by the courier of your choice.
                        </span>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <TextField
                                label="max sum"
                                type="number"
                                variant="outlined"
                                value={maxSum}
                                className={classes.input}
                                InputProps={{ inputProps: { min: 1 } }}
                                onChange={onMaxSumChange}
                            />
                            <TextField
                                label="max length"
                                type="number"
                                variant="outlined"
                                value={maxLength}
                                className={classes.input}
                                InputProps={{ inputProps: { min: 1 } }}
                                onChange={onMaxLengthChange}
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary">
                                Save
                            </Button>
                        </form>
                    </div>
                </Drawer>
            </Backdrop>
        </div>
    );
}

export default SetupDrawer;
