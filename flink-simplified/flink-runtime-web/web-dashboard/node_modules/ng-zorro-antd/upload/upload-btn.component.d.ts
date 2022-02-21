/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { HttpClient } from '@angular/common/http';
import { ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzUploadFile, ZipButtonOptions } from './interface';
export declare class NzUploadBtnComponent implements OnDestroy {
    private http;
    private elementRef;
    reqs: {
        [key: string]: Subscription;
    };
    private destroy;
    file: ElementRef;
    options: ZipButtonOptions;
    onClick(): void;
    onKeyDown(e: KeyboardEvent): void;
    onFileDrop(e: DragEvent): void;
    onChange(e: Event): void;
    private traverseFileTree;
    private attrAccept;
    private attachUid;
    uploadFiles(fileList: FileList | File[]): void;
    private upload;
    private post;
    private xhr;
    private clean;
    abort(file?: NzUploadFile): void;
    constructor(http: HttpClient, elementRef: ElementRef);
    ngOnDestroy(): void;
}
