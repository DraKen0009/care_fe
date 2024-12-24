import { PatientModel } from "@/types/emr/patient";

export function isPatientMandatoryDataFilled(patient: PatientModel) {
  return (
    patient.phone_number &&
    patient.emergency_phone_number &&
    patient.name &&
    patient.gender &&
    (patient.date_of_birth || patient.year_of_birth) &&
    patient.address &&
    patient.permanent_address &&
    patient.pincode &&
    patient.state &&
    patient.district &&
    patient.local_body &&
    ("medical_history" in patient ? patient.medical_history : true) &&
    patient.blood_group
  );
}

export const getPatientUrl = (patient: PatientModel) => {
  let patientUrl = "";
  if (!isPatientMandatoryDataFilled(patient)) {
    patientUrl = `/facility/${patient.facility}/patient/${patient.id}`;
  } else if (
    patient.last_consultation &&
    patient.last_consultation?.facility === patient.facility &&
    !(patient.last_consultation?.discharge_date && patient.is_active)
  ) {
    patientUrl = `/facility/${patient.facility}/patient/${patient.id}/consultation/${patient.last_consultation.id}`;
  } else if (patient.facility) {
    patientUrl = `/facility/${patient.facility}/patient/${patient.id}`;
  } else {
    patientUrl = `/patient/${patient.id}`;
  }
  return patientUrl;
};
