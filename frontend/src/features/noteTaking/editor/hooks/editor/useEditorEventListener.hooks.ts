import type { Editor, EditorEvents } from "@tiptap/react";
import { useEffect } from "react";

function useEditorEventListener(
    editor: Editor,
    eventName: keyof EditorEvents,
    callback: Parameters<Editor['on']>[1]
) {
    useEffect(() => {
        editor.on(eventName, callback);

        return () => {
            editor.off(eventName, callback);
        };
    }, [editor, eventName, callback]);
}

export default useEditorEventListener;
