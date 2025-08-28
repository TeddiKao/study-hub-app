interface CreateNotebookFormStore {
    name: string;
    description: string;
    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearDetails: () => void;

    updateFormVisibility: (isVisible: boolean) => void;
}