import { useState } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles'

import Calculator from './Calculator';
import SetupDrawer from './Drawer';

const useStyles = makeStyles((theme) => ({
    drawerButton: {
        marginTop: theme.spacing(2)
    }
}));

export function App() {
    const classes = useStyles();

    const [ drawerOpen, setDrawerOpen ] = useState(true);
    const [ maxSum, setMaxSum ] = useState(0);
    const [ maxLength, setMaxLength ] = useState(0);

    function onMaxDimensionsChange (sum: number, length: number) {
        setMaxSum(sum);
        setMaxLength(length);

        setDrawerOpen(false);
    }

    function openDrawer () {
        setDrawerOpen(true);
    }

    return (
        <>
            <h1>THE BOX-SIZER</h1>
            <Calculator
                maxSum={maxSum} 
                maxLength={maxLength}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={openDrawer} 
                className={classes.drawerButton}>
                Change max sizes
            </Button>
            <SetupDrawer
                show={drawerOpen}
                defaultMaxSum={maxSum}
                defaultMaxLength={maxLength}
                onMaxDimensionsChange={onMaxDimensionsChange}
            />
        </>
    );
}

export default App;
