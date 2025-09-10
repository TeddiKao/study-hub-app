function sanitiseAttributes(attributes: Record<(string | number), unknown>) {
    return Object.fromEntries(
        Object.entries(attributes).filter(([attrKey, attrValue]) => {
            if (typeof attrKey === "number") {
                return false;
            }

            if (attrValue === undefined) {
                return false;
            }

            return true;
        }) 
    )
}

export { sanitiseAttributes }