import { AssetBedModel } from "@/components/Assets/AssetTypes";
import {
  OperationAction,
  PTZPayload,
} from "@/components/CameraFeed/useOperateCamera";
import { UserBareMinimum } from "@/components/Users/models";

import { Type } from "@/Utils/request/api";
import { PaginatedResponse } from "@/Utils/request/types";
import { WritableOnly } from "@/Utils/types";

export type GetStatusResponse = {
  result: {
    position: PTZPayload;
    moveStatus: {
      panTilt: "IDLE" | "MOVING";
      zoom: "IDLE" | "MOVING";
    };
    error: string;
    utcTime: string;
  };
};

export type GetStreamTokenResponse = {
  result: {
    token: string;
  };
};

export type GetPresetsResponse = {
  result: Record<string, number>;
};

export type CameraPreset = {
  readonly id: string;
  name: string;
  readonly asset_bed: AssetBedModel;
  position: PTZPayload;
  readonly created_by: UserBareMinimum;
  readonly updated_by: UserBareMinimum;
  readonly created_date: string;
  readonly modified_date: string;
  readonly is_migrated: boolean;
};

export const FeedRoutes = {
  operateAsset: {
    path: "/api/v1/asset/{id}/operate_assets/",
    method: "POST",
    TRes: Type<
      GetStreamTokenResponse | GetStatusResponse | GetPresetsResponse
    >(),
    TBody: Type<{ action: OperationAction }>(),
  },

  positionPresets: {
    list: {
      path: "/api/camera/position-presets/",
      method: "GET",
      TRes: Type<PaginatedResponse<CameraPreset>>(),
    },
    create: {
      path: "/api/camera/position-presets/",
      method: "POST",
      TRes: Type<CameraPreset>(),
      TBody: Type<WritableOnly<CameraPreset>>(),
    },
    update: {
      path: "/api/camera/position-presets/{id}/",
      method: "PATCH",
      TRes: Type<CameraPreset>(),
      TBody: Type<Partial<WritableOnly<CameraPreset>>>(),
    },
    delete: {
      path: "/api/camera/position-presets/{id}/",
      method: "DELETE",
      TRes: Type<CameraPreset>(),
    },
  },
} as const;
