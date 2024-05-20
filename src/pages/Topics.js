import { Box, Button, Card, CardActions, CardContent, TablePagination, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
        <Box>
            {topics.map(topic => (
                <Card className="topic">
                    <CardContent>
                        <Box className="topic-header">
                            <Typography className="topic-title">{topic.title}</Typography>
                            <Box className="topic-data-container">
                                <Box className="topic-data">
                                    <PersonIcon className="topic-data__icon" />
                                    <Typography className="topic-data__value">{topic.author}</Typography>
                                </Box>
                                <Box className="topic-data">
                                    <CommentIcon className="topic-data__icon" />
                                    <Typography className="topic-data__value">{topic.comments}</Typography>
                                </Box>
                                <Box className="topic-data">
                                    <VisibilityIcon className="topic-data__icon" />
                                    <Typography className="topic-data__value">{topic.views}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button className="view-topic-button">View topic</Button>
                    </CardActions>
                </Card>
            ))}
            <TablePagination
                component="div"
                count={topics.length}
                page={pagination.page}
                onPageChange={(e, page) => setPagination({...pagination, page: page})}
                rowsPerPage={pagination.perPage}
                onRowsPerPageChange={e => setPagination({...pagination, perPage: e.target.value})}
            />
        </Box>
    )
}

export default Topics;