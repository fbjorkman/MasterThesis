/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NzResizableService } from './resizable.service';
export declare type NzResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export declare class NzResizeHandleMouseDownEvent {
    direction: NzResizeDirection;
    mouseEvent: MouseEvent | TouchEvent;
    constructor(direction: NzResizeDirection, mouseEvent: MouseEvent | TouchEvent);
}
export declare class NzResizeHandleComponent implements OnInit, OnDestroy {
    private nzResizableService;
    private cdr;
    private elementRef;
    nzDirection: NzResizeDirection;
    readonly nzMouseDown: EventEmitter<NzResizeHandleMouseDownEvent>;
    entered: boolean;
    private destroy$;
    constructor(nzResizableService: NzResizableService, cdr: ChangeDetectorRef, elementRef: ElementRef);
    ngOnInit(): void;
    onMousedown(event: MouseEvent | TouchEvent): void;
    ngOnDestroy(): void;
}
