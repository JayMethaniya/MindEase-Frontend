export interface Doctor {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  specialization: string;
  hospital: string;
  medicalRegNumber: string;
  degrees: string[];
  address: string;
  gender: string;
  profilePhoto?: string;
} 