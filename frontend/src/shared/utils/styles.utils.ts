function hasSizingClass(className?: string) {
    if (!className) return false;

    const hasSizing = className.match(/\b(w-|h-)/);

    return hasSizing;
}

export { hasSizingClass }