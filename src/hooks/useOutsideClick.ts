import React, {useEffect} from "react";

const useOutsideClick = (ref: React.MutableRefObject<any>, cb: () => void): void => {
    useEffect(() => {
        // cb() if clicked outside of element
                function handleClickOutside(event: MouseEvent): void {
            // contains - является ли узел потомком данного узла
            if (
                ref.current !== null &&
                !ref.current.contains(event.target)
            ) {
                cb();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, cb]);
}

export default useOutsideClick