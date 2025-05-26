import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ReusableTextField = (props) => {
    const {
        variant = "outlined",
        margin = "normal",
        required = false,
        fullWidth = true,
        label,
        id,
        name,
        autoComplete,
        autoFocus = false,
        value,
        onChange,
        type = "text",
        ...otherProps // To pass any other TextField specific props
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Determine the type to display (text or password)
    const displayType = type === 'password' && showPassword ? 'text' : type;

    return (
        <TextField
            variant={variant}
            margin={margin}
            required={required}
            fullWidth={fullWidth}
            label={label}
            id={id}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            type={displayType} // Use displayType here
            InputProps={type === 'password' ? { // Conditionally add InputAdornment for password fields
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : {}}
            {...otherProps}
        />
    );
};

export default ReusableTextField;
