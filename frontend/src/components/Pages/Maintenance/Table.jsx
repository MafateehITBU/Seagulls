import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import CloseTicket from './CloseTicket';
import TimeCounter from './TimeCounter'
import EditMaintenance from './EditMaintenance';
import DeleteTicket from './DeleteTicket';
import { PaginationTable } from "./Pagination";
import request from '../../../utils/request';
import axios from 'axios';
import CreateTicket from './CreateTicket'
import { AdminInfoContext } from '../../../context/AdminInfoContext'

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
    const { adminInfo, setAdminInfo, selectItem } = useContext(AdminInfoContext)
    const [deleteId, setDeleteId] = useState(' ')
    const [editId, setEditId] = useState(' ')
    const [closeTicketId, setcloseTicketId] = useState(' ')
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
            const response = await axios.get(`${request.defaults.baseURL}Maintenance`);
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
                <td>{row.openedBy}</td>
                <td>{row.openedTo}</td>
                <td>
                    {
                        row.priority === "High" ? (
                            <span className="badge text-bg-danger fs-6 w-75">High</span>
                        ) : row.priority === "Medium" ? (
                            <span className="badge text-bg-secondary fs-6 w-75">Medium</span>
                        ) : row.priority === "Low" ? (
                            <span className="badge text-bg-primary fs-6 w-75">Low</span>
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
                <td>{row.report}</td>
                <td>
                    {row.pictureBefore.url == "" ? (
                        <></>
                    ) : (
                        <a href={row.pictureBefore.url} target='_blank'>Picture Before</a>
                    )}
                </td>
                <td>
                    {row.pictureAfter.url == "" ? (
                        <></>
                    ) : (
                        <a href={row.pictureAfter.url} target='_blank'>Picture After</a>
                    )}
                </td>
                <td>
                    {row.approvedIT == "" ? (
                        <></>
                    ) : row.approvedIT == "approved" ? (
                        <span className="badge bg-success fs-6">approved</span>
                    ) : row.approvedIT == "rejected" ? (
                        <span className="badge bg-danger fs-6">Rejected</span>
                    ) : (
                        <></>
                    )}
                </td>
                <td>
                    {row.rejectedIT == "" ? (
                        <></>
                    ) : (
                        <>{row.rejectedIT}</>
                    )}
                </td>
                <td>{row.time}</td>
                <td>
                    <TimeCounter startTime={row.startTime} endTime={row.endTime} />
                </td>
                {/* <td>
                    {
                        row.status === "close" ? (
                            <div className='d-flex gap-3 align-items-center'>
                                <i className="fa-regular fa-circle-check text-success fs-4"></i>
                            </div>
                        ) : row.status === "pending" ? (
                            <div className='d-flex gap-3 align-items-center'>
                                <i className="fa-regular fa-pen-to-square text-success fs-4 icon-cursor" onClick={() => setEditId(row._id)} data-bs-toggle="modal" data-bs-target="#EditAccident"></i>
                                <i className="fa-regular fa-trash-can text-danger fs-4 icon-cursor" onClick={() => setDeleteId(row._id)} data-bs-toggle="modal" data-bs-target="#DeleteAccidentTicket"></i>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </td> */}
                <td>
                    <div className='d-flex gap-3 align-items-center'>
                        <i className="fa-regular fa-pen-to-square text-success fs-4 icon-cursor" onClick={() => setEditId(row._id)} data-bs-toggle="modal" data-bs-target="#EditMaintenance"></i>
                        <i className="fa-regular fa-trash-can text-danger fs-4 icon-cursor" onClick={() => setDeleteId(row._id)} data-bs-toggle="modal" data-bs-target="#DeleteMaintenanceTicket"></i>
                    </div>
                </td>
                <td>
                    {
                        row.status === "pending" ? (
                            <button type="button" className="btn btn-success">
                                Pending
                            </button>
                        ) : row.status === "in progress" ? (
                            <button type="button" className="btn btn-secondary">
                                In progress
                            </button>
                        ) : row.status === "close" ? (
                            <button type="button" className="btn btn-danger" onClick={() => setcloseTicketId(row._id)} data-bs-toggle="modal" data-bs-target="#CloseMaintenanceTicket">
                                Close Ticket
                            </button>
                        ) : (
                            <></>
                        )
                    }
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
            <CreateTicket adminInfo={adminInfo} setAdminInfo={setAdminInfo} fetchData={fetchData} />
            <EditMaintenance adminInfo={adminInfo} editId={editId} fetchData={fetchData} />
            <CloseTicket adminInfo={adminInfo} closeTicketId={closeTicketId} fetchData={fetchData} />
            <DeleteTicket adminInfo={adminInfo} deleteId={deleteId} fetchData={fetchData} />

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

            <div className="d-flex justify-content-end mt-3 mb-3">
                <PaginationTable pageNmbers={numbers} setCurrentPage={setCurrentPage} />
            </div>
            <div className='Table-scroll'>
                <Table horizontalSpacing="xl" verticalSpacing="xl" miw={3600} sx={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
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
                            <Th>
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
                                sorted={sortColumn === 'issueDiscrption'}
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
                                Report
                            </Th>
                            <Th>
                                picture Before
                            </Th>
                            <Th>
                                picture After
                            </Th>
                            <Th>
                                IT Approved
                            </Th>
                            <Th>
                                Depa Report IT
                            </Th>
                            <Th>
                                Time
                            </Th>
                            <Th>
                                Timer
                            </Th>
                            <Th>
                                Modification
                            </Th>
                            <Th>
                                Status
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {showTable}
                    </tbody>
                </Table>
            </div >
        </>
    );
}
