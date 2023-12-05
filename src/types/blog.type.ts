import { ICategory } from "./category.type";
import { IFile } from "./user.type";

export interface IBlog {
    id?: number;
    createdAt: string
    updatedAt?: string
    deletedAt?: string
    status: string;
    type: string;
    category: ICategory;
    title: string;
    instructorThumbnail: IFile;
    instructorName: string;
    url: string;
    content: string;
    isAdvertisement: boolean;
    isBookmark: boolean;
    totalView: number;
    totalBookmark: number;
    totalComment: number;
    thumbnail: IFile;
    images: IFile[];
    hashtags: Hashtags[];
    isHot: boolean;
    duration?: string
}

export interface IBlogListRequest {
    categoryId?: number | string,
    listType?: string
    keyword?: string
    page?: number | string
    limit?: number | string
    type?: string
    currentId?: number | string
}


export interface Hashtags {
    status: string;
    name: string;

}