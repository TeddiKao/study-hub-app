import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Underline,
} from "lucide-react";
import { toggleMark } from "../utils/marks.utils";
import clsx from "clsx";
import type { MarkName } from "../types/editor.types";
import type { ComponentType } from "react";
import { toggleHeading } from "../utils/blocks.utils";

interface EditorBubbleMenuProps {
    editor: Editor | null;
}

interface MarkButtonProps {
    editor: Editor | null;
    markName: MarkName;
    isActive: boolean;
}

interface HeadingButtonProps {
    editor: Editor | null;
    level: number;
    isActive: boolean;
}

type HeadingButtonsProps = EditorBubbleMenuProps;

function MarkButton({ editor, markName, isActive }: MarkButtonProps) {
    if (!editor) return null;

    const IconMarkMapping: Record<
        MarkName,
        ComponentType<{
            size?: number;
            strokeWidth?: number;
            className?: string;
        }>
    > = {
        bold: Bold,
        italic: Italic,
        underline: Underline,
    };

    function getMarkIcon() {
        const Icon = IconMarkMapping[markName];

        return <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />;
    }

    const activeClasses = isActive
        ? "bg-gray-300 hover:bg-gray-400"
        : "bg-white hover:bg-gray-300";

    return (
        <button
            onClick={() => toggleMark(editor, markName)}
            type="button"
            aria-label={`Toggle ${markName}`}
            aria-pressed={isActive}
            className={clsx(
                "border-none outline-none p-1.5 rounded-md hover:cursor-pointer",
                activeClasses
            )}
        >
            {getMarkIcon()}
        </button>
    );
}

function MarkButtons({ editor }: EditorBubbleMenuProps) {
    if (!editor) return null;

    return (
        <div className="flex flex-row gap-1">
            {["bold", "italic", "underline"].map((markName) => (
                <MarkButton
                    key={markName}
                    editor={editor}
                    markName={markName as MarkName}
                    isActive={editor.isActive(markName)}
                />
            ))}
        </div>
    );
}

function HeadingButton({ editor, isActive, level }: HeadingButtonProps) {
    if (!editor) return null;

    const IconHeadingMapping: Record<
        string,
        ComponentType<{
            size?: number;
            strokeWidth?: number;
            className?: string;
        }>
    > = {
        1: Heading1,
        2: Heading2,
        3: Heading3,
    };

    const activeClasses = isActive
        ? "bg-gray-300 hover:bg-gray-400"
        : "bg-white hover:bg-gray-300";

    function getHeadingIcon() {
        const Icon = IconHeadingMapping[level];

        return <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />;
    }

    return (
        <button
            onClick={() => {
                toggleHeading(editor, level);
                console.log(editor.getJSON());
            }}
            className={clsx(
                "p-1.5 rounded-md hover:cursor-pointer",
                activeClasses
            )}
            type="button"
        >
            {getHeadingIcon()}
        </button>
    );
}

function HeadingButtons({ editor }: HeadingButtonsProps) {
    if (!editor) return null;

    return (
        <div className="flex flex-row gap-1">
            <HeadingButton
                editor={editor}
                isActive={editor.isActive("note_editor_heading", { level: 1 })}
                level={1}
            />
            <HeadingButton
                editor={editor}
                isActive={editor.isActive("note_editor_heading", { level: 2 })}
                level={2}
            />
            <HeadingButton
                editor={editor}
                isActive={editor.isActive("note_editor_heading", { level: 3 })}
                level={3}
            />
        </div>
    );
}

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
    if (!editor) return null;

    return (
        <BubbleMenu
            editor={editor}
            options={{
                placement: "bottom",
                offset: 8,
            }}
        >
            <div className="flex flex-row p-1 gap-1 bg-white shadow-md rounded-md">
                <MarkButtons editor={editor} />
                <HeadingButtons editor={editor} />
            </div>
        </BubbleMenu>
    );
}

export default EditorBubbleMenu;
