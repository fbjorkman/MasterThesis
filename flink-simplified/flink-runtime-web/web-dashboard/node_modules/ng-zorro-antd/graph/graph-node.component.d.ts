/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationBuilder } from '@angular/animations';
import { ElementRef, EventEmitter, Renderer2, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzGraphGroupNode, NzGraphNode } from './interface';
interface Info {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class NzGraphNodeComponent {
    private el;
    private builder;
    private renderer2;
    node: NzGraphNode | NzGraphGroupNode;
    noAnimation?: boolean;
    customTemplate?: TemplateRef<{
        $implicit: NzGraphNode | NzGraphGroupNode;
    }>;
    readonly nodeClick: EventEmitter<NzGraphNode | NzGraphGroupNode>;
    triggerClick(event: MouseEvent): void;
    animationInfo: Info | null;
    initialState: boolean;
    private animationPlayer;
    constructor(el: ElementRef, builder: AnimationBuilder, renderer2: Renderer2);
    makeAnimation(): Observable<void>;
    makeNoAnimation(): void;
    getAnimationInfo(): Info;
    nodeTransform(): {
        x: number;
        y: number;
    };
    computeCXPositionOfNodeShape(): number;
}
export {};
