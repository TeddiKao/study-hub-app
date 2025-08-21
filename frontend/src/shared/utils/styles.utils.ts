const SIZING_CLASS_REGEX = /(?:^|[\s:])(?:w-|h-|size-)/;

function hasSizingClass(className?: string) {
    if (!className) return false;

    const hasSizing = SIZING_CLASS_REGEX.test(className);

    return hasSizing;
}

export { hasSizingClass }