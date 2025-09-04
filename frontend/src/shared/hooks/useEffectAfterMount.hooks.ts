import {
    useEffect,
    useRef,
    type DependencyList,
    type EffectCallback,
} from "react";

function useEffectAfterMount(callback: EffectCallback, deps: DependencyList) {
    const hasMountedRef = useRef(false);

    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        return callback();
    }, deps);
}

export default useEffectAfterMount;
