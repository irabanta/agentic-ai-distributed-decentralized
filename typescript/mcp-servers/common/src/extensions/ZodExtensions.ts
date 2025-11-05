import { z } from "zod";

// Add the xUserMustInput method to ZodString prototype
export function zodStrUserMustInput(input: z.ZodString, fieldName?: string, message?: string): z.ZodString {
    if (!fieldName) {
        return input.describe(message || "This field must be user input.");
    }
    return input.describe(`The [${fieldName}] must be input by the user.`);
};

// Add the xRequired method to ZodString prototype
export function zodStrRequired(input: z.ZodString, fieldName?: string, message?: string): z.ZodString {
    if (!fieldName) {
        return input.min(1, message || "This field is required and cannot be empty.");
    }
    return input.min(1, message || `[${fieldName}] is required and cannot be empty.`);
};

// Add the xLength method to ZodString prototype
export function zodStrLength(input: z.ZodString, length: number, fieldName?: string, message?: string): z.ZodString {
    const str = input.describe(input.description + ` Must be exactly ${length} characters long.`);
    return str.min(length, message || (fieldName || `This field` + ` must be at least ${length} characters long.`))
               .max(length, message || (fieldName || `This field` + ` must be at most ${length} characters long.`));
};

export function zodEnumUserMustInput(input: z.ZodEnum<any>, fieldName?: string, message?: string): z.ZodEnum<any> {
    if (!fieldName) {
        return input.describe(message || "This field must be user input.");
    }
    return input.describe(`The [${fieldName}] must be input by the user.`);
};

console.error('[Setup] Zod extensions loaded successfully');
// Export an empty object to ensure this module is loaded as a side-effect
export {};