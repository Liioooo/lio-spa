export interface OnChanges {

    /**
     * called when one of the input properties changes
     * @param property
     * @param oldValue
     * @param newValue
     */
    onChanges(property: string, oldValue: unknown, newValue: unknown): void;
}