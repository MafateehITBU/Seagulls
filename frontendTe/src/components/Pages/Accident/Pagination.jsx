import { Group, Pagination } from '@mantine/core';

export function PaginationTable({ pageNmbers, setCurrentPage }) {

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Pagination.Root total={pageNmbers.length} onChange={handlePageChange}>
            <Group spacing={5} position="center">
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
            </Group>
        </Pagination.Root>
    );
}
