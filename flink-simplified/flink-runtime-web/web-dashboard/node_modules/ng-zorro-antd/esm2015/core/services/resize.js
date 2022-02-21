/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime, finalize } from 'rxjs/operators';
import * as i0 from "@angular/core";
const NOOP = () => { };
const ɵ0 = NOOP;
export class NzResizeService {
    constructor(ngZone, rendererFactory2) {
        this.ngZone = ngZone;
        this.rendererFactory2 = rendererFactory2;
        this.resizeSource$ = new Subject();
        this.listeners = 0;
        this.disposeHandle = NOOP;
        this.handler = () => {
            this.ngZone.run(() => {
                this.resizeSource$.next();
            });
        };
        this.renderer = this.rendererFactory2.createRenderer(null, null);
    }
    subscribe() {
        this.registerListener();
        return this.resizeSource$.pipe(auditTime(16), finalize(() => this.unregisterListener()));
    }
    unsubscribe() {
        this.unregisterListener();
    }
    registerListener() {
        if (this.listeners === 0) {
            this.ngZone.runOutsideAngular(() => {
                this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
            });
        }
        this.listeners += 1;
    }
    unregisterListener() {
        this.listeners -= 1;
        if (this.listeners === 0) {
            this.disposeHandle();
            this.disposeHandle = NOOP;
        }
    }
}
NzResizeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeService_Factory() { return new NzResizeService(i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i0.RendererFactory2)); }, token: NzResizeService, providedIn: "root" });
NzResizeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzResizeService.ctorParameters = () => [
    { type: NgZone },
    { type: RendererFactory2 }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL3NlcnZpY2VzL3Jlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXJELE1BQU0sSUFBSSxHQUFHLEdBQVMsRUFBRSxHQUFFLENBQUMsQ0FBQzs7QUFLNUIsTUFBTSxPQUFPLGVBQWU7SUFlMUIsWUFBb0IsTUFBYyxFQUFVLGdCQUFrQztRQUExRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWQ3RCxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFN0MsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUlkLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLFlBQU8sR0FBRyxHQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBR0EsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzVCLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztZQXBERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVJvQixNQUFNO1lBQWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IE5PT1AgPSAoKTogdm9pZCA9PiB7fTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNpemVTb3VyY2UkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIGxpc3RlbmVycyA9IDA7XG5cbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIHByaXZhdGUgZGlzcG9zZUhhbmRsZSA9IE5PT1A7XG5cbiAgcHJpdmF0ZSBoYW5kbGVyID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZVNvdXJjZSQubmV4dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcmVuZGVyZXJGYWN0b3J5MjogUmVuZGVyZXJGYWN0b3J5Mikge1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyRmFjdG9yeTIuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gIH1cblxuICBzdWJzY3JpYmUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKCk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXNpemVTb3VyY2UkLnBpcGUoXG4gICAgICBhdWRpdFRpbWUoMTYpLFxuICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy51bnJlZ2lzdGVyTGlzdGVuZXIoKSlcbiAgICApO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgdGhpcy51bnJlZ2lzdGVyTGlzdGVuZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwb3NlSGFuZGxlID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdyZXNpemUnLCB0aGlzLmhhbmRsZXIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lcnMgKz0gMTtcbiAgfVxuXG4gIHByaXZhdGUgdW5yZWdpc3Rlckxpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzIC09IDE7XG5cbiAgICBpZiAodGhpcy5saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgIHRoaXMuZGlzcG9zZUhhbmRsZSgpO1xuICAgICAgdGhpcy5kaXNwb3NlSGFuZGxlID0gTk9PUDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==