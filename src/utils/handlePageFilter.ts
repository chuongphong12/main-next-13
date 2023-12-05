import { NextRouter } from "next/router"

type IHandlePageFilter = {
    router: NextRouter
    query: {
        [key: string]: any;
    }

}

export const handlePageFilter = ({ router, query }: IHandlePageFilter) => {
    let o = Object.keys(query)
        .filter((k) => query[k] != null && query[k] != '')
        .reduce((a, k) => ({ ...a, [k]: query[k] }), {});
    router.query = o
    router.push(router)
}
