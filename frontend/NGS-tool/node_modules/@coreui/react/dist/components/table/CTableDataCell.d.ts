import React, { TdHTMLAttributes } from 'react';
import { Colors } from '../Types';
export interface CTableDataCellProps extends Omit<TdHTMLAttributes<HTMLTableDataCellElement>, 'align'> {
    /**
     * Highlight a table row or cell.
     */
    active?: boolean;
    /**
     * Set the vertical aligment.
     */
    align?: 'bottom' | 'middle' | 'top';
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
}
export declare const CTableDataCell: React.ForwardRefExoticComponent<CTableDataCellProps & React.RefAttributes<HTMLTableDataCellElement>>;
