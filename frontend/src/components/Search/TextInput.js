import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const TextInput = () => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box>
        <FormControl variant="outlined">
          <OutlinedInput
            sx={{ height: "35px", width: "100%" }}
            id="outlined-adornment-weight"
            type="number"
            value={values.weight}
            onChange={handleChange('weight')}
            startAdornment={<InputAdornment position="start">></InputAdornment>}
            endAdornment={<InputAdornment position="end">B$</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
          />
        </FormControl>
    </Box>
  );
}

export default TextInput;