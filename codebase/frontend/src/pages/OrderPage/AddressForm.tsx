import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface FormErrors {
	firstName?: string;
	lastName?: string;
	addressLine1?: string;
	addressLine2?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	country?: string;
}

export default function AddressForm() {

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const errors = { ...formErrors };

    // perform validation for the field

    if (id === "firstName" && !/^[a-zA-Z ]+$/.test(value)){
      errors.firstName = "Invalid First Name";
    } else if (id === "lastName" && !/^[a-zA-Z ]+$/.test(value)){
      errors.lastName = " Invalid Last Name";
    } else if (id === "addressLine1" && !/^[a-zA-Z ]+$/.test(value)){
      errors.addressLine1 = "Invalid Address Line1 ";
    } else if (id === "addressLine2" && !/^[a-zA-Z ]+$/.test(value)){
      errors.addressLine2 = "Invalid Address Line2 ";
    } else if (id === "city" && !/^[a-zA-Z ]+$/.test(value)){
      errors.city = "Invalid State ";
    } else if (id === "state" && !/^[a-zA-Z ]+$/.test(value)){
      errors.state = "Invalid State ";
    } else if (id === "postalCode" && !/^[0-9]+$/.test(value)){
      errors.postalCode = "Invalid Address Line1 ";
    } else if (id === "country" && !/^[a-zA-Z ]+$/.test(value)){
      errors.country = "Invalid country ";
    } 


    setFormErrors(errors);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.addressLine1}
            helperText={formErrors.addressLine1 || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.addressLine2}
            helperText={formErrors.addressLine2 || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.city}
            helperText={formErrors.city || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.state}
            helperText={formErrors.state || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            InputProps={{
              inputProps: {
                inputMode: "numeric",
                pattern: "^[0-9]+$",
                minLength: 5,
                maxLength: 5,
              },
            }}
            error={!!formErrors.postalCode}
            helperText={formErrors.postalCode || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            InputProps={{ inputProps: { pattern: "^[a-zA-Z ]+$" } }}
            error={!!formErrors.country}
            helperText={formErrors.country || ""}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}