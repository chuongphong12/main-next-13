export interface IUser {
	id: string;
	email: string;
	subEmail: string;
	phoneNumber: string;
	role: string;
	createdAt: string;
	updatedAt?: string;
	deletedAt?: string;
	lastChangedPasswordAt?: string;
	nickname: string;
	language?: string;
	isDarkMode?: boolean;
	isReceiveEventEmail?: boolean;
	isReceiveEventPhone?: boolean;
	avatar?: IFile;
	country?: ICountry;
}

export interface IFile {
	id: number;
	url: string;
	name: string;
	fileType?: string;
}

export interface ICountry {
	id: number;
	name: string;
	code: string;
	flag: string;
}
