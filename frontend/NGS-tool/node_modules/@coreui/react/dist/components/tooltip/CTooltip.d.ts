import { FC, ReactElement, ReactNode } from 'react';
import { Triggers } from '../Types';
export interface CTooltipProps {
    children: ReactElement;
    /**
     * Content node for your component.
     */
    content: ReactNode | string;
    /**
     * Callback fired when the component requests to be hidden.
     */
    onHide?: () => void;
    /**
     * Callback fired when the component requests to be shown.
     */
    onShow?: () => void;
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @type 'hover' | 'focus' | 'click'
     */
    trigger?: Triggers | Triggers[];
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
    /**
     * Toggle the visibility of popover component.
     */
    visible?: boolean;
}
export declare const CTooltip: FC<CTooltipProps>;
