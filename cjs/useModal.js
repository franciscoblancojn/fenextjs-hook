"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = void 0;
const react_1 = require("react");
const useAction_1 = require("./useAction");
const uselocalstoragenextjs_1 = require("uselocalstoragenextjs");
const useModal = ({ name, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled = false, activeByNameLocalStorage = false, }) => {
    const [active, setActive] = (0, react_1.useState)(defaultActiveProps ?? false);
    const { value: namesLocalStorage, setLocalStorage } = (0, uselocalstoragenextjs_1.useLocalStorage)({
        name: "fenext-modal-active-name",
        parse: (e) => {
            try {
                return JSON.parse(e ?? "[]");
            }
            catch {
                return [];
            }
        },
        defaultValue: [],
    });
    const onPush = (name) => {
        if (name) {
            const n = [...(namesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name) => {
        if (name) {
            const n = [...(namesLocalStorage ?? [])].filter((e) => e != name);
            setLocalStorage(n);
        }
    };
    const { onAction } = (0, useAction_1.useAction)({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                setActive(e ?? false);
            }
            : undefined,
    });
    const onChange = (d) => {
        if (disabled) {
            return;
        }
        if (d) {
            onPush(name);
        }
        else {
            onPop(name);
        }
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };
    const onActive = () => {
        if (disabled) {
            return;
        }
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        if (disabled) {
            return;
        }
        onChange(false);
        onCloseProps?.();
    };
    return {
        active: activeByNameLocalStorage
            ? (namesLocalStorage ?? []).at(-1) == name
            : activeProps ?? active,
        onChange,
        onActive,
        onClose,
    };
};
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map