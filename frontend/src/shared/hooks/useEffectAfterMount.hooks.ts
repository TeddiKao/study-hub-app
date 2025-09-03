import { useEffect, useRef } from "react";

function useEffectAfterMount(callback: () => void, deps: any[]) {
    const hasMountedRef = useRef(false);
    
    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        callback();
    }, [...deps]);
}


export default useEffectAfterMount;
