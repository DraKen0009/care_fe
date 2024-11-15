import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AssetCreate from "@/components/Facility/AssetCreate";

import { mockAssetData } from "@/mocks/assetCreateMockData";

describe("AssetCreate Component", () => {
  it("renders form with all required fields", async () => {
    render(<AssetCreate facilityId="mockFacilityId" />);

    // Check for the loading component
    expect(screen.getByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      // General Details fields
      expect(screen.getByTestId("asset-name-input")).toBeInTheDocument();
      expect(screen.getByTestId("asset-location-input")).toBeInTheDocument();
      expect(screen.getByTestId("asset-class-input")).toBeInTheDocument();
      expect(screen.getByTestId("asset-description-input")).toBeInTheDocument();

      // Warranty Details fields
      expect(
        screen.getByTestId("asset-manufacturer-input"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("asset-warranty-input")).toBeInTheDocument();
      expect(
        screen.getByTestId("asset-support-name-input"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("asset-support-email-input"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("asset-vendor-name-input")).toBeInTheDocument();

      // Service Details fields
      expect(
        screen.getByTestId("asset-last-serviced-on-input"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("asset-notes-input")).toBeInTheDocument();

      // Action buttons
      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();

      // Create Asset button
      const createAssetButton = screen.getByRole("button", {
        name: /create_asset/i,
      });
      expect(createAssetButton).toBeInTheDocument();

      // Create Add More button
      const createAddMoreButton = screen.getByRole("button", {
        name: /create_add_more/i,
      });
      expect(createAddMoreButton).toBeInTheDocument();
    });
  });

  it("enables submit button only when required fields are filled", async () => {
    render(<AssetCreate facilityId="mockFacilityId" />);

    // Wait until the loading screen disappears
    await waitForElementToBeRemoved(() => screen.getByAltText("loading"));

    const createAssetButton = screen.getByRole("button", {
      name: /create_asset/i,
    });
    fireEvent.click(createAssetButton);

    // Wait for validation error messages to appear
    await waitFor(() => {
      // Check for required field validation messages
      expect(
        screen.getByText(/Asset name can't be empty/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Select a location/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter valid phone number/i),
      ).toBeInTheDocument();
    });
  });

  it("loads and displays asset data when assetId is provided", async () => {
    render(<AssetCreate facilityId="mockFacilityId" assetId="mock-asset-id" />);

    // Optionally, check for a loading indicator if one exists
    await waitForElementToBeRemoved(() => screen.getByAltText("loading"));

    // Asset Name
    const assetNameInput = screen.getByLabelText(/asset_name/i);
    expect(assetNameInput).toHaveValue(mockAssetData.name);

    // Serial Number
    const serialNumber = screen.getByLabelText(/serial_number/);
    expect(serialNumber).toHaveValue(mockAssetData.serial_number);

    // Vendor Name
    const vendorName = screen.getByLabelText(/vendor_name/);
    expect(vendorName).toHaveValue(mockAssetData.vendor_name);

    // Support Name
    const supportName = screen.getByLabelText(/customer_support_name/);
    expect(supportName).toHaveValue(mockAssetData.support_name);

    // Support Phone
    const supportPhone = screen.getByDisplayValue(mockAssetData.support_phone);
    expect(supportPhone).toBeInTheDocument();

    // Support Email
    const supportEmail = screen.getByLabelText(/customer_support_email/);
    expect(supportEmail).toHaveValue(mockAssetData.support_email);

    // Manufacturer
    const manufacturer = screen.getByLabelText(/manufacturer/);
    expect(manufacturer).toHaveValue(mockAssetData.manufacturer);

    // Asset Description
    const assetDescriptionTextarea = screen.getByPlaceholderText(
      "details_about_the_equipment",
    );
    expect(assetDescriptionTextarea).toHaveValue(mockAssetData.description);

    // Service Notes
    const notesTextarea = screen.getByPlaceholderText(
      "Eg. Details on functionality, service, etc.",
    );
    expect(notesTextarea).toHaveValue(mockAssetData.last_service.note);

    // Asset Class
    const ventilatorText = screen.getByText("Ventilator");
    expect(ventilatorText).toBeInTheDocument();
  });
});
