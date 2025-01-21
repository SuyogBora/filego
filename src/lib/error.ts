export class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AppError';
        // This line is needed for proper instanceof checks in TypeScript
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
