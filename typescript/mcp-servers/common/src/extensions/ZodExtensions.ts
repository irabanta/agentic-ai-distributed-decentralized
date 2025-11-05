import { z } from "zod";

// Extend the ZodString interface to add our custom methods
declare module "zod" {
    interface ZodString {
        /**
         * Adds a description indicating this field must be user input.
         * Used as a hint for AI agents to request user input rather than using default values.
         * @param fieldName Optional field name to include in the description
         * @param message Optional custom message
         * @returns The ZodString instance for chaining
         */
        xUserMustInput(fieldName?: string, message?: string): z.ZodString;
        
        /**
         * Marks this field as required with a minimum length of 1.
         * @param fieldName Optional field name to include in the error message
         * @param message Optional custom error message
         * @returns The ZodString instance for chaining
         */
        xRequired(fieldName?: string, message?: string): z.ZodString;
        
        /**
         * Sets exact length requirement for the string.
         * @param length The exact length required
         * @param fieldName Optional field name to include in the error message
         * @param message Optional custom error message
         * @returns The ZodString instance for chaining
         */
        xLength(length: number, fieldName?: string, message?: string): z.ZodString;
    }
}

// Add the xUserMustInput method to ZodString prototype
z.ZodString.prototype.xUserMustInput = function(fieldName?: string, message?: string): z.ZodString {
    if (!fieldName) {
        return this.describe(message || "This field must be user input.");
    }
    return this.describe(`The [${fieldName}] must be input by the user.`);
};

// Add the xRequired method to ZodString prototype
z.ZodString.prototype.xRequired = function(fieldName?: string, message?: string): z.ZodString {
    if (!fieldName) {
        return this.min(1, message || "This field is required and cannot be empty.");
    }
    return this.min(1, message || `[${fieldName}] is required and cannot be empty.`);
};

// Add the xLength method to ZodString prototype
z.ZodString.prototype.xLength = function(length: number, fieldName?: string, message?: string): z.ZodString {
    const str = this.describe(this.description + ` Must be exactly ${length} characters long.`);
    return str.min(length, message || (fieldName || `This field` + ` must be at least ${length} characters long.`))
               .max(length, message || (fieldName || `This field` + ` must be at most ${length} characters long.`));
};

console.log('[Setup] Zod extensions loaded successfully');

// Verify the extensions are available
const testString = z.string();
if (typeof testString.xRequired === 'function') {
    console.log('[Setup] ✓ xRequired extension verified');
} else {
    console.error('[Setup] ✗ xRequired extension NOT found!');
}

// Verify the xLength extension
if (typeof testString.xLength === 'function') {
    console.log('[Setup] ✓ xLength extension verified');
} else {
    console.error('[Setup] ✗ xLength extension NOT found!');
}

// Export an empty object to ensure this module is loaded as a side-effect
//export {};