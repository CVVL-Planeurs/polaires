import { useState } from "react";
import { Box,  Slider, TextField, Typography } from "@mui/material";


export function NumericInput({ 
  label, 
  min = 0, 
  max = 100, 
  step = 1, 
  defaultValue = min, 
  unit = "", 
  onChange,
  disabled = false, 
}: { label: string, min: number, max: number, step: number, defaultValue: number,
  unit: string, onChange: (x: number) => void, disabled?: boolean
}) {
  const [value, setValue] = useState<number>(defaultValue);

  const updateValue = (newValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} sx={{width: 250}}>
      {label && <Typography  color={disabled ? 'textDisabled': 'text.primary'}>{label}</Typography>}

      <Box display="flex" alignItems="center" gap={1}>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            type="number"
            value={value}
            onChange={(e) => updateValue(Number(e.target.value))}
            size="small"
            variant="outlined"
            sx={{ width: 100 }}
            disabled={disabled}
          />
          {unit && <Typography variant="body2">{unit}</Typography>}


          <Slider
            value={value}
            onChange={(_, newValue) => updateValue(newValue as number)}
            min={min}
            max={max}
            step={step}
            sx={{ width: 100 }}
            disabled={disabled}
          />
        </Box>
      </Box>
    </Box>
  );
}