import { AssetLocationType } from "@/components/Assets/AssetTypes";

export const facilityData = {
  results: [
    {
      facility: { name: "Mocked Facility", id: "mock-facility-id" },
      id: "mock-location-id",
      location_type: AssetLocationType.WARD,
      name: "Mocked Ward",
      description: "Mocked ward description",
      middleware_address: "",
    },
    {
      facility: { name: "Mocked Facility", id: "mock-facility-id" },
      id: "mock-location-id-2",
      location_type: AssetLocationType.ICU,
      name: "Mocked ICU",
      description: "Mocked ICU description",
      middleware_address: "",
    },
  ],
  count: 2,
  next: null,
  previous: null,
};

export const mockAssetData = {
  id: "asset-id",
  status: "ACTIVE",
  asset_type: "INTERNAL",
  location_object: {
    id: "location-id",
    facility: { id: "facility-id", name: "Facility Name" },
    location_type: "OTHER",
    name: "Test Location",
    description: "Location Description",
  },
  last_service: {
    id: "service-id",
    serviced_on: "2024-01-01",
    note: "Service notes 123",
  },
  resolved_middleware: {
    hostname: "middleware.example.com",
    source: "facility",
  },
  created_date: "2024-01-01T00:00:00Z",
  modified_date: "2024-01-01T00:00:00Z",
  name: "Asset Name",
  description: "Asset description",
  asset_class: "VENTILATOR",
  is_working: true,
  not_working_reason: "",
  serial_number: "SERIAL12345",
  warranty_details: "Basic warranty",
  vendor_name: "Vendor Name",
  support_name: "Support Contact",
  support_phone: "+911234567890",
  support_email: "support@example.com",
  manufacturer: "Manufacturer Name",
  warranty_amc_end_of_validity: "2024-12-31",
};
