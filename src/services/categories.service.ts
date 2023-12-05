import axios from '@/services/axios';
import { IResponse } from '@/types/response.types';
import { IBlogListRequest } from '@/types/blog.type';

const ENDPOINT = '/categories';

export async function getBlogCategories() {
	const { data } = await axios.get(`${ENDPOINT}/active?type=CONTENT`);
	return data;
}
