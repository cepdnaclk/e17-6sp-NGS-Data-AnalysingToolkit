import React, { TableHTMLAttributes } from 'react';
import { Colors } from '../Types';
export interface CTableProps extends TableHTMLAttributes<HTMLTableElement> {
    /**
     * Set the vertical aligment.
     */
    align?: 'bottom' | 'middle' | 'top';
    /**
     * Sets the border color of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    borderColor?: Colors;
    /**
     * Add borders on all sides of the table and cells.
     */
    bordered?: boolean;
    /**
     * Remove borders on all sides of the table and cells.
     */
    borderless?: boolean;
    /**
     * Put the `<caption>` on the top of the table.
     */
    caption?: 'top';
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * Enable a hover state on table rows within a `<CTableBody>`.
     */
    hover?: boolean;
    /**
     * Make any table responsive across all viewports or pick a maximum breakpoint with which to have a responsive table up to.
     */
    responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /**
     * Make table more compact by cutting all cell `padding` in half.
     */
    small?: boolean;
    /**
     * Add zebra-striping to any table row within the `<CTableBody>`.
     */
    striped?: boolean;
}
export declare const CTable: React.ForwardRefExoticComponent<CTableProps & React.RefAttributes<HTMLTableElement>>;
