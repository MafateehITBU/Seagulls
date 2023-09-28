import React, { useContext, useEffect, useState } from 'react';
import { createStyles, Table, UnstyledButton, Group, Text, Center, TextInput, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { PaginationTable } from "./Pagination";
import request from "../../utils/request";
import axios from 'axios';
import CreateSpareParts from './CreateSpareParts'
import EditSpareParts from './EditSpareParts'
import DeleteSpareParts from './DeleteSpareParts'
import { AdminInfoContext } from '../../context/AdminInfoContext'

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
    const { adminInfo, setAdminInfo, selectBigItem } = useContext(AdminInfoContext)
    const [deleteId, setDeleteId] = useState(' ')
    const [editId, seteditId] = useState(' ')
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
            const response = await axios.get(`${request.defaults.baseURL}SpareParts`);
            const reversedData = response.data.reverse();
            setSortedData(reversedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    //To make search results always at the top
    const filteredData = sortedData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = selectBigItem;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage);
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
            < tr key={row._id} className={+row.quantity <= +row.minimumStock ? "alert alert-danger" : ""} >
                <td>{row.partNo}</td>
                <td>{row.partBarCode}</td>
                <td>{row.partName}</td>
                <td>{row.vendor}</td>
                <td>{row.quantity}</td>
                <td>
                    <a href={row.sparePartsImage.url} target='_blank'>Spare Parts Image</a>
                </td>
                <td>{row.minimumStock}</td>
                <td>{row.maximumStock}</td>
                <td>{row.expiryData}</td>
                <td>{row.leadTime}</td>
                <td className={row.storageType === "Regular store" ? "alert alert-secondary" : "alert alert-info"}>{row.storageType}</td>
                < td >
                    <div className='d-flex gap-3 align-items-center'>
                        <i className="fa-regular fa-pen-to-square text-success fs-4 icon-cursor" onClick={() => seteditId(row._id)} data-bs-toggle="modal" data-bs-target="#EditSpareParts"></i>
                        <i className="fa-regular fa-trash-can text-danger fs-4 icon-cursor" onClick={() => setDeleteId(row._id)} data-bs-toggle="modal" data-bs-target="#DeleteSpareParts"></i>
                    </div>
                </td>
            </tr >
        ))
    ) : (
        <tr>
            <td colSpan="16">No records found</td>
        </tr>
    );

    return (
        <>
            <CreateSpareParts adminInfo={adminInfo} fetchData={fetchData} />
            <EditSpareParts adminInfo={adminInfo} fetchData={fetchData} editId={editId} />
            <DeleteSpareParts adminInfo={adminInfo} fetchData={fetchData} deleteId={deleteId} />

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
                <Table horizontalSpacing="md" verticalSpacing="md" miw={2000} >
                    <thead>
                        <tr>
                            <Th
                                sorted={sortColumn === 'partNo'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('partNo')}
                            >
                                Part No
                            </Th>
                            <Th
                                sorted={sortColumn === 'partBarCode'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('partBarCode')}
                            >
                                Part BarCode
                            </Th>
                            <Th
                                sorted={sortColumn === 'partName'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('partName')}
                            >
                                part Name
                            </Th>
                            <Th
                                sorted={sortColumn === 'vendor'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('vendor')}
                            >
                                Vendor
                            </Th>
                            <Th
                                sorted={sortColumn === 'quantity'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('quantity')}
                            >
                                Quantity
                            </Th>
                            <Th>
                                Spare Parts Picture
                            </Th>
                            <Th
                                sorted={sortColumn === 'minimumStock'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('minimumStock')}
                            >
                                Minimum Stock
                            </Th>

                            <Th
                                sorted={sortColumn === 'maximumStock'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('maximumStock')}
                            >
                                Maximum Stock
                            </Th>
                            <Th
                                sorted={sortColumn === 'expiryData'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('expiryData')}
                            >
                                Expiry Data
                            </Th>
                            <Th
                                sorted={sortColumn === 'leadTime'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('leadTime')}
                            >
                                Lead Time
                            </Th>
                            <Th
                                sorted={sortColumn === 'storageType'}
                                reversed={sortOrder === 'desc'}
                                onSort={() => handleSort('storageType')}>
                                Storage Type
                            </Th>
                            <Th>
                                Modification
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
