import { useState } from "react"


 const usePage = (initialPage = "home") => {
    const [currentPage, useCurrentPage] = useState(initialPage);

    return {
        currentPage,
        useCurrentPage
    }
}

export default usePage