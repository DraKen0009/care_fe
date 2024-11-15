import { HttpResponse, http } from "msw";

import { facilityData, mockAssetData } from "./assetCreateMockData";

export const assetHandlers = [
  // Handler for listing facility asset locations
  http.get(
    "https://careapi.ohc.network/api/v1/facility/:facility_external_id/asset_location/",
    () => {
      return HttpResponse.json(facilityData);
    },
  ),

  // Handler for fetching a specific asset
  http.get("https://careapi.ohc.network/api/v1/asset/:mock-asset-id/", () => {
    return HttpResponse.json(mockAssetData);
  }),
];
