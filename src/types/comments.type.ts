import { ICategory } from "./category.type";
import { IFile, IUser } from "./user.type";

export interface IComment {
    id: number;
    createdAt: string
    updatedAt?: string
    deletedAt?: string
    status: string;
    type: string;
    userId: number;
    user: IUser;
    contentId: number;
    comment: string;
    totalComment?: number;

}

export interface ICommentListRequest {
    page?: number | string
    limit?: number | string
    contentId?: number | string
    parentId?: number | string
}

export interface ICreateComment {
    comment: string,
    contentId: number,
    parentId?: number
}