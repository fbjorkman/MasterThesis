/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
export declare class NzOptionSelectionChange {
    source: NzAutocompleteOptionComponent;
    isUserInput: boolean;
    constructor(source: NzAutocompleteOptionComponent, isUserInput?: boolean);
}
export declare class NzAutocompleteOptionComponent {
    private changeDetectorRef;
    private element;
    nzAutocompleteOptgroupComponent: NzAutocompleteOptgroupComponent;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    nzValue: NzSafeAny;
    nzLabel?: string;
    nzDisabled: boolean;
    readonly selectionChange: EventEmitter<NzOptionSelectionChange>;
    readonly mouseEntered: EventEmitter<NzAutocompleteOptionComponent>;
    active: boolean;
    selected: boolean;
    constructor(changeDetectorRef: ChangeDetectorRef, element: ElementRef, nzAutocompleteOptgroupComponent: NzAutocompleteOptgroupComponent);
    select(emit?: boolean): void;
    onMouseEnter(): void;
    deselect(): void;
    /** Git display label */
    getLabel(): string;
    /** Set active (only styles) */
    setActiveStyles(): void;
    /** Unset active (only styles) */
    setInactiveStyles(): void;
    scrollIntoViewIfNeeded(): void;
    selectViaInteraction(): void;
    private emitSelectionChangeEvent;
}
