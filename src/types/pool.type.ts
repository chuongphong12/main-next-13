import { IFile, IUser } from "./user.type";

export interface IEducation {
    id?: number;
    schoolName: string;
    majors: string
    startDateAt: string;
    endDateAt: string;
    degree: string;
    degreeKr?: string
}

export interface IExperience {
    id?: number;
    companyName: string;
    undertaking: string
    startDateAt: string;
    endDateAt: string;
    isCurrentlyWorking: boolean;
    yearsOfExperience?: number
}

export interface IProject {
    id?: number;
    projectName: string;
    projectOwner: string
    relatedLink: string
    description: string
    startDateAt: string;
    endDateAt: string;
}

export interface IPool {
    id?: number;
    jobTitles: string[]
    schools: IEducation[]
    experiences: IExperience[]
    skills: string[];
    projects: IProject[]
    files: { id: number }[] | IFile[]
    urls: string[];
    city: string
    district: string
    location: string
    introduction: string
    yearsOfExperience?: number
    user?: IUser
    isBookmark?: boolean
}

export interface IPoolListRequest {
    category?: string,
    keyword?: string
    page?: number | string
    limit?: number | string
}
