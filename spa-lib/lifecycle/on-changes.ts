export interface OnChanges {
    onChanges(property: string, oldValue: unknown, newValue: unknown): void;
}