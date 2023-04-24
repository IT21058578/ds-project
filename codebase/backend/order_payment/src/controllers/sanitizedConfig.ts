interface SanitizedConfig {
    STRIPE_SECRET_KEY: string;
  }

const config = {
    STRIPE_SECRET_KEY: 'my-stripe-secret-key',
  };
  
  // Sanitize the config object by removing any keys with undefined or null values
  const sanitizedConfig = Object.entries(config).reduce((acc: SanitizedConfig, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof SanitizedConfig] = value;
    }
    return acc;
  }, {} as SanitizedConfig);
  
  
  
export default sanitizedConfig;
  