import { useState } from "react";
import { Box, IconButton, Slider, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export function NumericInput({ 
  label, 
  min = 0, 
  max = 100, 
  step = 1, 
  defaultValue = min, 
  unit = "", 
  onChange 
}) {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (newValue) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {label && <Typography variant="body2">{label}</Typography>}

      <Box display="flex" alignItems="center" gap={1}>
        {/* <IconButton size="small" onClick={() => updateValue(value - step)}>
          <RemoveIcon />
        </IconButton> */}

        <Box display="flex" alignItems="center" gap={0.5}>
          <TextField
            type="number"
            value={value}
            onChange={(e) => updateValue(Number(e.target.value))}
            size="small"
            variant="outlined"
            sx={{ width: 100 }}
          />
          {unit && <Typography variant="body2">{unit}</Typography>}
        </Box>

        {/* <IconButton size="small" onClick={() => updateValue(value + step)}>
          <AddIcon />
        </IconButton> */}

        <Slider
          value={value}
          onChange={(e, newValue) => updateValue(newValue)}
          min={min}
          max={max}
          step={step}
          sx={{ width: 100 }}
        />
      </Box>
    </Box>
  );
}
