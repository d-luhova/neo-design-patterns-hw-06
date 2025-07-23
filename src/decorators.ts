// Декоратор для додавання timestamp
export function withTimestamp<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args): Return {
    const [message, ...rest] = args;
    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").split(".")[0];
    const newMessage = `[${timestamp}] ${message}`;
    return originalMethod.call(this, ...( [newMessage, ...rest] as unknown as Args));
  };
}

// Декоратор для перетворення в верхній регістр
export function uppercase<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args): Return {
    const [message, ...rest] = args;
    const upperMessage = message.toUpperCase();
    return originalMethod.call(this, ...( [upperMessage, ...rest] as unknown as Args));
  };
}