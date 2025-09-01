import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",
    addOptions() {
        return {
            HTMLAttributes: {
                class: "text-4xl font-bold"
            }      
        }
    },

    parseHTML() {
        return [
            {
                tag: "h1",
                getAttrs: (node) => ({
                    class: node.getAttribute("class"),
                })
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ["h1", HTMLAttributes, 0]
    }
})

export { Title }