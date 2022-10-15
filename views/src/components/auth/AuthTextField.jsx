import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthTextField = React.forwardRef(
  ({ type, name, control, Controller, errors, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false);

    if (type === "password") {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              inputRef={ref}
              variant="standard"
              type={showPass ? "text" : "password"}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message}
              fullWidth
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ my: 1, width: 1 }}
              {...field}
              {...props}
            />
          )}
        />
      );
    }

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            type={type || "text"}
            error={Boolean(errors[name])}
            helperText={errors[name]?.message}
            fullWidth
            size="medium"
            sx={{ my: 1, width: 1 }}
            {...field}
            {...props}
          />
        )}
      />
    );
  }
);

export default AuthTextField;
