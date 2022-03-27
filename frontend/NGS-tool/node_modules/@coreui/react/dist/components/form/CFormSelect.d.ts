import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
declare type Option = {
    disabled?: boolean;
    label?: string;
    value?: string;
};
export interface CFormSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Specifies the number of visible options in a drop-down list.
     */
    htmlSize?: number;
    /**
     * Set component validation state to invalid.
     */
    invalid?: boolean;
    /**
     * Method called immediately after the `value` prop changes.
     */
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    /**
     * Options list of the select component. Available keys: `label`, `value`, `disabled`.
     * Examples:
     * - `options={[{ value: 'js', label: 'JavaScript' }, { value: 'html', label: 'HTML', disabled: true }]}`
     * - `options={['js', 'html']}`
     */
    options?: Option[] | string[];
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
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
export declare const CFormSelect: React.ForwardRefExoticComponent<CFormSelectProps & React.RefAttributes<HTMLSelectElement>>;
export {};
