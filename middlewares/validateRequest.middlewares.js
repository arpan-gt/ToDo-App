export const validateRequest = (schema) => (req, res, next) => {
  console.log(req.body);
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log(result.error.errors)
    return res.status(400).json(
      {
        message: "Validation failed",
        errors: result.error.errors
      });
  }

  req.validatedData = result.data;
  next();
}