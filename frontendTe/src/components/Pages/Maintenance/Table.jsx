import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { PaginationTable } from "./Pagination";
import request from '../../../utils/request';
import axios from 'axios';
import { TechnicianInfoContext } from '../../../context/TechnicianInfoContext'
import Collect from './Collect'


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

export function TableSort() {
    const { technicianInfo, setTechnicianInfo, selectItem } = useContext(TechnicianInfoContext)
    const [idTicket, setIdTicket] = useState(' ')
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Maintenance/showCollect`);
            const reversedData = response.data.reverse();
            setSortedData(reversedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = selectItem;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = sortedData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(sortedData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

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

    const sortedRecords = [...records];
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
            <tr key={row._id}>
                {/* <td><Link to={`/Profile/${row.id}`} target='_blank'> {row.technicianName} </Link></td> */}
                {/* <td>{row.openedBy}</td> */}
                {/* <td>{row.openedTo}</td> */}
                <td>
                    {
                        row.priority === "High" ? (
                            <span className="badge text-bg-danger fs-6 w-100">High</span>
                        ) : row.priority === "Medium" ? (
                            <span className="badge text-bg-secondary fs-6 w-100">Medium</span>
                        ) : row.priority === "Low" ? (
                            <span className="badge text-bg-primary fs-6 w-100">Low</span>
                        ) : (
                            <></>
                        )
                    }
                </td>
                <td>{row.assetName}</td>
                <td>{row.assetType}</td>
                <td>{row.assetSubType}</td>
                <td>{row.sparePartsName}</td>
                <td><a href={row.sparePartsImage.url} target='_blank'>Spare parts image</a></td>
                <td>{row.location}</td>
                <td className='note-table-td'>{row.issueDiscrption}</td>
                <td>{row.time}</td>
                <td>
                    <button type="button" onClick={() => setIdTicket(row._id)} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#CollectMaintenance"  >
                        Collect
                    </button>
                </td>
            </tr >
        ))
    ) : (
        <tr>
            <td colSpan="16">No records found</td>
        </tr>
    )

    return (
        <>
            <Collect technicianInfo={technicianInfo} idTicket={idTicket} fetchData={fetchData} />

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

            {/* <div className="d-flex justify-content-end mt-3 mb-3">
                <PaginationTable pageNmbers={numbers} setCurrentPage={setCurrentPage} />
            </div> */}

            <div className='Table-scroll'>
                <Table horizontalSpacing="xl" verticalSpacing="xl" miw={2000} >
                    <thead>
                        <tr>
                            {/* <Th>
                                Opened To
                            </Th> */}
                            <Th
                                sorted={sortColumn === 'priority'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('priority')}
                            >
                                Priority
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetName'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetName')}
                            >
                                Asset Name
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetType')}
                            >
                                Asset Type
                            </Th>
                            <Th
                                sorted={sortColumn === 'assetSubType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('assetSubType')}
                            >
                                Asset Sub Type
                            </Th>
                            <Th
                                sorted={sortColumn === 'sparePartsName'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('sparePartsName')}
                            >
                                Spare Parts Name
                            </Th>
                            <Th >
                                Spare Parts Picture
                            </Th>
                            <Th
                                sorted={sortColumn === 'location'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('location')}
                            >
                                Location
                            </Th>

                            <Th
                                sorted={sortColumn === 'noissueDiscrptionte'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('issueDiscrption')}
                            >
                                Issue Discrption
                            </Th>
                            <Th
                                sorted={sortColumn === 'report'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('report')}
                            >
                                Ticket Start Time
                            </Th>
                            <Th
                                sorted={sortColumn === 'status'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('status')}
                            >
                                Status
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {showTable}
                    </tbody>
                </Table>
            </div>
        </>
    );
}






















