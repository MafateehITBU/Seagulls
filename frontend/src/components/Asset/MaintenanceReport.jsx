import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import request from "../../utils/request";
import axios from 'axios';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },


    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));

export default function MaintenanceReport({ assetId }) {
    const [searchText, setSearchText] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [secondSortColumn, setSecondSortColumn] = useState(null);
    const [secondSortOrder, setSecondSortOrder] = useState('asc');

    function Th({ children, reversed, sorted, onSort }) {
        const { classes } = useStyles();
        const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
        return (
            <th className={classes.th}>
                <UnstyledButton onClick={onSort} className={classes.control}>
                    <Group position="apart">
                        <Text fw={500} fz="sm">
                            {children}
                        </Text>
                        <Center className={classes.icon}>
                            <Icon size="0.9rem" stroke={1.5} />
                        </Center>
                    </Group>
                </UnstyledButton>
            </th>
        );
    }

    const fetchData = async (ID) => {
        try {
            if (ID) {
                const response = await axios.get(`${request.defaults.baseURL}Asset/${ID}`);
                const data = response.data.maintenanceReports.reverse();
                setSortedData(data);
            } else {
                setSortedData([]);
            }
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        fetchData(assetId);
    }, [assetId]);

    // Sort according to the letters
    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    // Sort according to the letters
    const handleSecondSort = (column) => {
        if (column === secondSortColumn) {
            setSecondSortOrder(secondSortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSecondSortColumn(column);
            setSecondSortOrder('asc');
        }
    };

    const sortedRecords = [...sortedData];
    if (sortColumn) {
        sortedRecords.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (sortOrder === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }

    if (sortColumn) {
        sortedRecords.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (sortOrder === 'asc') {
                const priorityMap = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                };
                return priorityMap[valueA] - priorityMap[valueB];
            } else {
                const priorityMap = {
                    Low: 1,
                    Medium: 2,
                    High: 3,
                };
                return priorityMap[valueB] - priorityMap[valueA];
            }
        });
    }

    //View the data in addition to making all forms of the filter
    const filteredRows = sortedRecords.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const showTable = filteredRows.length > 0 ? (
        filteredRows.map((row) => (
            <tr key={row.IdTicket}>
                <td>{row.IdTicket}</td>
                <td>{row.openedBy}</td>
                <td>{row.openedTo}</td>
                <td>{row.sparePartsName}</td>
                <td>{row.Date}</td>
            </tr >
        ))
    ) : (
        <tr>
            <td colSpan="16">No records found</td>
        </tr>
    )

    return (
        <div className="modal fade" id="MaintenanceReport" tabIndex={-1} aria-labelledby="MaintenanceReportLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="MaintenanceReportLabel">Maintenance Report</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-outline">
                            <input
                                type="search"
                                id="form1"
                                className="form-control"
                                placeholder="Search . . "
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} />
                        </div>

                        <div className='Table-scroll'>
                            <Table horizontalSpacing="md" verticalSpacing="md" miw={800} >
                                <thead>
                                    <tr>
                                        <Th>
                                            Ticket ID
                                        </Th>
                                        <Th
                                            sorted={sortColumn === 'openedBy'}
                                            reversed={sortOrder === 'desc'}
                                            onSort={() => handleSort('openedBy')}
                                        >
                                            Opened By
                                        </Th>
                                        <Th
                                            sorted={sortColumn === 'openedTo'}
                                            reversed={sortOrder === 'desc'}
                                            onSort={() => handleSort('openedTo')}
                                        >
                                            Opened To
                                        </Th>
                                        <Th
                                            sorted={sortColumn === 'sparePartsName'}
                                            reversed={sortOrder === 'desc'}
                                            onSort={() => handleSort('sparePartsName')}
                                        >
                                            Spare Parts Name
                                        </Th>
                                        <Th
                                            sorted={sortColumn === 'Date'}
                                            reversed={sortOrder === 'desc'}
                                            onSort={() => handleSort('Date')}
                                        >
                                            Date
                                        </Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showTable}
                                </tbody>
                            </Table>
                        </div >
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}





