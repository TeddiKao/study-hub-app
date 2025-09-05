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
        function onEditorEvent() {
            callbackRef.current();
        }

        editor.on(eventName, onEditorEvent);

        return () => {
            editor.off(eventName, onEditorEvent);
        };
    }, [editor, eventName]);
}

export default useEditorEventListener;
