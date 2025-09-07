import { useEffect, useRef } from "react";

function useLatest<T>(value: T) {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref;
}

export default useLatest;
