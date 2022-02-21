/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
export declare const POSITION_MAP: {
    [key: string]: ConnectionPositionPair;
};
export declare const DEFAULT_TOOLTIP_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_CASCADER_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_MENTION_TOP_POSITIONS: ConnectionPositionPair[];
export declare const DEFAULT_MENTION_BOTTOM_POSITIONS: ConnectionPositionPair[];
export declare function getPlacementName(position: ConnectedOverlayPositionChange): string | undefined;
