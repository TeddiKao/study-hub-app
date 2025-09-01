import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",
    addOptions() {
        return {
            HTMLAttributes: {}      
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