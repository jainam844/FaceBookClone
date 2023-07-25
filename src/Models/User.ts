export interface IUserData {
  // Include the 'avatar' property in the interface
  address?: string | null;
  avatar: string;
  birthDate?: number | null;
  cityId?: string | null;
  countryId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  profileText?: string | null;
  userId: number;
  userProfile?: string | null;
}

export class UserData implements IUserData {
  // Include the 'avatar' property in the class
  address?: string | null;
  avatar: string;
  birthDate?: number | null;
  cityId?: string | null;
  countryId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  profileText?: string | null;
  userId: number;
  userProfile?: string | null;

  constructor(init?: IUserData) {
    this.email = init?.email ?? "";
    this.firstName = init?.firstName ?? "";
    this.avatar = init?.avatar ?? "";
    this.lastName = init?.lastName ?? "";
    this.password = init?.password ?? "";
    this.userId = init?.userId ?? 0;
    this.phoneNumber = init?.phoneNumber ?? 0;
    this.address = init?.address ?? null;
    this.birthDate = init?.birthDate ?? 0;
    this.cityId = init?.cityId ?? null;
    this.countryId = init?.countryId ?? null;
    this.profileText = init?.profileText ?? null;
    this.userProfile = init?.userProfile ?? null;
  }
}
