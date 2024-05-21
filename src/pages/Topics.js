import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

const Topics = () => {
    const [topics, setTopics] = useState([]);

    const [pagination, setPagination] = useState({
        page: 0,
        perPage: 10,
        pages: 1
    });

    useEffect(() => {
        // API call to retrieve topics by pagination parameters
        setTopics([
            { id: 1, title: "Topic 1", views: 1, comments: 10, author: "Ivan Ivanov" },
            { id: 2, title: "Topic 2", views: 2, comments: 11, author: "Albert Vasilev" }
        ]);
    }, [pagination])

    return (
        <TableContainer component={Paper}>
            <Table sx={{width: "100%"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Comments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topics.map(topic => (
                        <TableRow key={topic.id}>
                            <TableCell>{topic.title}</TableCell>
                            <TableCell>{topic.author}</TableCell>
                            <TableCell>{topic.views}</TableCell>
                            <TableCell>{topic.comments}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        colSpan={5}
                        count={topics.length}
                        page={pagination.page}
                        onPageChange={(e, page) => setPagination({...pagination, page: page})}
                        rowsPerPage={pagination.perPage}
                        onRowsPerPageChange={e => setPagination({...pagination, perPage: e.target.value})}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default Topics;