import type { Editor, EditorEvents } from "@tiptap/react";
import { useEffect, useRef } from "react";

function useEditorEventListener(
    editor: Editor,
    eventName: keyof EditorEvents,
    callback: Parameters<Editor['on']>[1]
) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    })

    useEffect(() => {
        editor.on(eventName, callbackRef.current);

        return () => {
            editor.off(eventName, callbackRef.current);
        };
    }, [editor, eventName]);
}

export default useEditorEventListener;
