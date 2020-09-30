import React from 'react';
import { SwatchesPicker } from 'react-color';
import { FaPaintBrush } from "react-icons/fa";

type RichTextEditorColorPickerProps = {
    expanded: boolean,
    onExpandEvent: any,
    onChange: any,
    currentState: any,
}
export default function RichTextEditorColorPicker({ expanded, onExpandEvent, onChange, currentState }: RichTextEditorColorPickerProps
) {
    const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const handleChange = (color: any) => {
        onChange('color', color.hex);
    };

    const renderModal = () => {
        const { color } = currentState;
        return (
            <div onClick={stopPropagation} className="demo-color-modal" >
                <SwatchesPicker color={color} onChangeComplete={handleChange} />
            </div>
        );
    };

    return (
        <div
            className="rdw-colorpicker-wrapper"
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-label="rdw-color-picker"
        >
            <div className="rdw-option-wrapper" onClick={onExpandEvent}>
                <FaPaintBrush />
            </div>
            {expanded ? renderModal() : undefined}
        </div>
    );
}
