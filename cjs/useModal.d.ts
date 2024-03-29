export interface useModalProps {
    active?: boolean;
    defaultActive?: boolean;
    onActive?: () => void;
    onClose?: () => void;
    onChange?: (d: boolean) => void;
}
export declare const useModal: ({ active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, }: useModalProps) => {
    active: boolean;
    onChange: (d: boolean) => void;
    onActive: () => void;
    onClose: () => void;
};
