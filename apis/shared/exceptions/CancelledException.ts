interface CancelledExceptionArgs {
  handlerName: string;
  reason: string;
}

class CancelledException extends Error {
  reason: string;
  handlerName: string;

  constructor(args: CancelledExceptionArgs) {
    super(`${args.handlerName}: Call Cancelled. Reason: ${args.reason}.`);

    this.reason = args.reason;
    this.handlerName = args.handlerName;
  }
}

export default CancelledException;
