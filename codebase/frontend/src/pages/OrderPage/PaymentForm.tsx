import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface FormErrors {
  cardName?: string;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
}

export default function PaymentForm() {
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const errors = { ...formErrors };

    // perform validation for the field
    if (id === "cardName" && !/^[a-zA-Z ]+$/.test(value)) {
      errors.cardName = "Invalid name";
    } else if (id === "cardNumber" && !/^[0-9]+$/.test(value)) {
      errors.cardNumber = "Invalid card number";
    } else if (id === "expDate" && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
      errors.expDate = "Invalid expiry date";
    } else if (id === "cvv" && !/^[0-9]+$/.test(value)) {
      errors.cvv = "Invalid CVV";
    }

    setFormErrors(errors);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.cardName}
            helperText={formErrors.cardName || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[0-9]+$" } }}
            error={!!formErrors.cardNumber}
            helperText={formErrors.cardNumber || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^(0[1-9]|1[0-2])\/([0-9]{2})$" } }}
            error={!!formErrors.expDate}
            helperText={formErrors.expDate || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            // helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            InputProps={{
              inputProps: {
                inputMode: "numeric",
                pattern: "^[0-9]+$",
                minLength: 3,
                maxLength: 3,
              },
            }}
            error={!!formErrors.cvv}
            helperText={formErrors.cvv || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}