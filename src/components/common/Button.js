import {Button} from "@mui/material"
import * as React from 'react';

function BasicButtons({title}, {color}) {


    return (
        <Button variant="contained" className="w-100" color={color}>{title}</Button>
    );
}

export default BasicButtons