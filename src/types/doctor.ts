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
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  gender: string;
  profilePhoto?: string;
} 