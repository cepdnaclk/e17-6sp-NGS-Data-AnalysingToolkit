import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
export interface CFormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * Set component validation state to invalid.
     */
    invalid?: boolean;
    /**
     * Method called immediately after the `value` prop changes.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly` [docs]
     */
    plainText?: boolean;
    /**
     * Toggle the readonly state for the component.
     */
    readOnly?: boolean;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
    /**
     * Specifies the type of component.
     */
    type?: 'color' | 'file' | 'text' | string;
    /**
     * Set component validation state to valid.
     */
    valid?: boolean;
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value?: string | string[] | number;
}
export declare const CFormInput: React.ForwardRefExoticComponent<CFormInputProps & React.RefAttributes<HTMLInputElement>>;
